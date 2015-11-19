import io from 'socket.io-client';

let socket = io(window.requesterProxyServer);

// decompose url parameter
// https://www.mturkcontent.com/dynamic/hit?assignmentId=${assignmentId}&hitId=${hitId}
let params = {};
window.location.search.slice(1).split('&').forEach(param => {
  let [key, value] = param.split('=');
  params[key] = value;
});
socket.emit('requestContent', params.hitId, params.assignmentId);

socket.on('setContent', (hitId, content) => {
  document.getElementById('content').innerHTML = content;
});
