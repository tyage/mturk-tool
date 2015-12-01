import Config from './config';

let defaultQuestion = () => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
  <link rel="stylesheet" href="${Config.get('workerProxyServer')}/static/css/app.css" />
</head>
<body>
  <div id="content"></div>
  <script>window.requesterProxyServer = "${Config.get('workerProxyServer')}";</script>
  <script src="${Config.get('workerProxyServer')}/static/js/app.js"></script>
</body>
</html>
`;
}

export default defaultQuestion;
