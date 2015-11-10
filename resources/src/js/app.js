import io from 'socket.io-client';

let socket = io(window.questionControllerServer);

// decompose url parameter
// https://www.mturkcontent.com/dynamic/hit?assignmentId=${assignmentId}&hitId=${hitId}
let params = {};
window.location.search.slice(1).split('&').forEach((param) => {
  let [key, value] = param.split('=');
  params[key] = value;
});
socket.emit('requestHITContent', params);

socket.on('setHITContent', (data) => {
  document.getElementById('content').innerHTML = data.content;
});
