import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5001';

const socket = io(URL, {
  autoConnect: false,
});

const handleEmit = async (event, payload, onError, onSuccess) => {
  try {
    const response = await socket.emitWithAck(event, payload);
    console.log(response, 'RESPONSE');
    if (response) {
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(response.data);
      }
    }
  } catch (err) {
    onError();
  }
};

export { socket, handleEmit };
