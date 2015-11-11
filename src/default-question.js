import Config from './config';

let defaultQuestion = () => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
  <link rel="stylesheet" href="${Config.get('questionControllerServer')}/static/css/app.css" />
  <script>window.questionControllerServer = "${Config.get('questionControllerServer')}";</script>
  <script src="${Config.get('questionControllerServer')}/static/js/app.js"></script>
</head>
<body>
  <div id="content"></div>
</body>
</html>
`;
}

export default defaultQuestion;
