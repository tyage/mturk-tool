import io from 'socket.io-client';

let socket = io(window.requesterProxyServer);

// decompose url parameter
// https://www.mturkcontent.com/dynamic/hit?assignmentId=${assignmentId}&hitId=${hitId}
let params = {};
window.location.search.slice(1).split('&').forEach(param => {
  let [key, value] = param.split('=');
  params[key] = value;
});

// TODO: use cookie
let workerId = window.localStorage.getItem('workerId');
if (workerId === null) {
  workerId = Math.random();
  window.localStorage.setItem('workerId', workerId);
}

socket.emit('requestContent', params.hitId, workerId);

socket.on('setContent', (hitId, content) => {
  document.getElementById('content').innerHTML = content;
});

// TODO: if worker done, emit resolve
