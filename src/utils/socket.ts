import { io } from 'socket.io-client';
import { GLOBAL_CONSTANTS } from 'src/constants.global';

const socket = io(GLOBAL_CONSTANTS.socketUrl, {});

export function initSocket() {
  socket.connect();
  socket.emit('input', '');
}

export default socket;
