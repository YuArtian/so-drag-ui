if (!/yarn\.js$/.test(process.env.npm_execpath || '')) {
  console.warn(
    '\u001b[33m请确保设置了 yarn 的 electron 镜像地址，否则很可能安装失败.\u001b[39m'
  );
}
