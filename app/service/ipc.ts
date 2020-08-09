import { ipcMain, ipcRenderer } from 'electron';
import fs from 'fs';
import path from 'path';
import { networkInterfaces } from 'os';
import util from 'util';
import child_process from 'child_process';
// import events from 'events';
import { REPLACE_LIST } from '../constants/ipc';

const exec = util.promisify(child_process.exec);

// const ipcEventEmitter = new events.EventEmitter();

/* 修改模板配置文件 */
const editPreviewTemplate = async (temp: string) => {
  try {
    await fs.promises.writeFile(
      path.resolve(
        __dirname,
        '../../template/so-react-template/src/components.config.js'
      ),
      temp,
      'utf8'
    );
  } catch (error) {
    console.log('<==== ERROR::replaceSelectedList ====>', error);
  }
};

/* 初始化预览模板配置文件 */
export const initPreviewTemplateConfig = async () => {
  await editPreviewTemplate('export default []');
};

/* 设置监听 -更新已选组件列表 */
export const subReplaceSelectedList = () => {
  ipcMain.on(REPLACE_LIST, (event, arg) => {
    // event.sender.send('reply', 'pong');
    const componentsConfigString = `export default ${JSON.stringify(arg)}`;
    // 修改配置文件的方法
    editPreviewTemplate(componentsConfigString);
  });
};
/* 触发 -更新已选组件列表 */
export const emitReplaceSelectedList = (newList) => {
  ipcRenderer.send(REPLACE_LIST, newList);
};
/* 获取本机ip地址 */
export const getIP = () => {
  const interfaces = networkInterfaces(); // 在开发环境中获取局域网中的本机iP地址
  let IPAddress = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const name in interfaces) {
    if (Object.prototype.hasOwnProperty.call(interfaces, name)) {
      const iface = interfaces[name];
      // eslint-disable-next-line no-restricted-syntax
      for (const alias of iface) {
        if (
          alias.family === 'IPv4' &&
          alias.address !== '127.0.0.1' &&
          !alias.internal
        ) {
          IPAddress = alias.address;
        }
      }
    }
  }
  return IPAddress;
};
