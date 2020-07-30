export default class HTMLCompoiler {
  compoile(code: string) {
    const html = `<!DOCTYPE>
<html lang="zh">
<head>
<title>so drag ui</title>
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
</head>
<body>${code}</body>
</html>`;
    return html;
  }
}
