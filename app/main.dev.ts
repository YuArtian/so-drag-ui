/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import {
  subReplaceSelectedList,
  initPreviewTemplateConfig,
} from './service/ipc';

/* 更新器 */
export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}
/* 主窗口 */
let mainWindow: BrowserWindow | null = null;
/* 生产环境 source map设置 */
if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}
/* 开发环境 debug模式 */
if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}
/* 开发环境 开发工具设置 */
const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};
/* 创建窗口 -设置主窗口 -设置菜单 */
const createWindow = async () => {
  try {
    // 安装开发工具
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      await installExtensions();
    }
    // 初始化模板配置文件
    await initPreviewTemplateConfig();
    // 创建主窗口
    mainWindow = new BrowserWindow({
      show: false,
      // width: 1024,
      // height: 728,
      // 默进入认全屏
      fullscreen: true,
      webPreferences:
        (process.env.NODE_ENV === 'development' ||
          process.env.E2E_BUILD === 'true') &&
        process.env.ERB_SECURE !== 'true'
          ? {
              nodeIntegration: true,
              webviewTag: true,
            }
          : {
              preload: path.join(__dirname, 'dist/renderer.prod.js'),
              webviewTag: true,
            },
    });
    // 主窗口加载
    mainWindow.loadURL(`file://${__dirname}/app.html`);
    // 主窗口加载完成
    mainWindow.webContents.on('did-finish-load', () => {
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        mainWindow.minimize();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    });
    // 主窗口关闭
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
    // 创建菜单
    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();
    // 自动更新
    // eslint-disable-next-line
    new AppUpdater();
  } catch (error) {
    console.log('ERROR::主窗口创建失败(createWindow)', error);
  }
};

/* 主进程事件 */
// 监听已选组件列表更新
subReplaceSelectedList();
/* 应用事件 */
app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

if (process.env.E2E_BUILD === 'true') {
  // eslint-disable-next-line promise/catch-or-return
  app.whenReady().then(createWindow);
} else {
  app.on('ready', createWindow);
}

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
