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
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import fs from 'fs';
import MenuBuilder from './menu';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

// 启动 node 服务
// httpServer
//   .createServer({ root: '../pubilc/so-react-template/index.html' })
//   .listen(8080);

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
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

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
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

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

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

ipcMain.on('message', (event, arg) => {
  console.log('ipcMain message arg', arg);
  // event.sender.send('reply', 'pong');
  const componentsConfigString = `export default ${JSON.stringify(arg)}`;
  // 修改配置文件的方法
  fs.writeFile(
    path.resolve(
      __dirname,
      '../pubilc/so-react-template/src/components.config.js'
    ),
    componentsConfigString,
    'utf8',
    (error) => {
      if (error) {
        console.log('ERROR', error);
      }
    }
  );
  /*
    // 修改注入注释的方法
    const importString = Array.from(arg)
      .map((component) => {
        console.log('import compoent', component);

        return `import ${component.name} from './components/${component.name}/index.js';\r\n`;
      })
      .join('');
    const componentString = Array.from(arg)
      .map((component) => {
        return `<${component.name} dataSource={${JSON.stringify(
          component.data
        )}} />`;
      })
      .join('');
    const data = fs.readFileSync(
      path.resolve(__dirname, '../pubilc/so-react-template/src/App.js')
    );
    let AppStr = data.toString();
    AppStr = AppStr.replace(/\/\/so-imports/, importString).replace(
      /{\/\* so-components- \*\/}/,
      componentString
    );
    // AppStr = AppStr
    console.log('AppStr', AppStr);
    fs.writeFile(
      path.resolve(__dirname, '../pubilc/so-react-template/src/App.js'),
      AppStr,
      'utf8',
      (err) => {
        if (err) throw err;
        console.log('success done');
      }
    );
  */
});
