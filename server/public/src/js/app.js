import io from 'socket.io-client';
import mturk from './mturk';
import _ from 'lodash';

let socket = io(window.requesterProxyServer);

// decompose url parameter
// https://www.mturkcontent.com/dynamic/hit?assignmentId=${assignmentId}&hitId=${hitId}
let params = _.reduce(window.location.search.slice(1).split('&'), (params, param) => {
  let [key, value] = param.split('=');
  params[key] = value;
  return params;
}, {});

let workerId = window.localStorage.getItem('workerId');
if (workerId === null) {
  workerId = Math.random();
  window.localStorage.setItem('workerId', workerId);
}

socket.emit('requestContent', params.hitId, workerId);

socket.on('setContent', (hitId, content) => {
  document.getElementById('content').innerHTML = content;
  mturk.contentLoaded();
});

mturk.onAnswer(form => {
  socket.emit('answer', params.hitId, workerId, form.innerHTML);
});
