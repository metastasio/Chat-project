import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5001';

const socket = io(URL, {
  autoConnect: false,
});

const handleEmit = async (data, currentChannel, username, callback) => {
  try {
    await socket.timeout(10000).emitWithAck('newMessage', {
      body: data,
      channelId: currentChannel,
      username,
    });
  } catch (err) {
    callback();
  }
};

export { socket, handleEmit };
