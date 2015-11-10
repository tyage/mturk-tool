import Config from './config';

let defaultQuestion = () => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
  <link rel="stylesheet" href="https://raw.githubusercontent.com/tyage/mturk-tool/master/resources/dist/css/app.css" />
  <script>var window.questionControllerServer = "${Config.get('questionControllerServer')}";</script>
  <script src="https://raw.githubusercontent.com/tyage/mturk-tool/master/resources/dist/js/app.js"></script>
</head>
<body>

</body>
</html>
`;
}

export default defaultQuestion;
