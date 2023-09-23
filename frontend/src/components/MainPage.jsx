import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { socket } from '../socket.js';

import { addChannels } from '../store/channelsSlice';
import { setMessages, getNewMessages } from '../store/chatSlice';
import { getNewChannel } from '../store/channelsSlice';
import Channels from './Channels';
import Chat from './Chat';
import ModalWindow from './Modal.jsx';
import ModalNotification from './ModalNotification.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authorization);

  useEffect(() => {
    socket.connect();

    const onNewMessages = (value) => {
      dispatch(getNewMessages(value));
    };
    const onNewChannel = (value) => {
      dispatch(getNewChannel(value));
    };

    socket.on('newMessage', onNewMessages);
    socket.on('newChannel', onNewChannel);

    return () => {
      socket.off('newMessage', onNewMessages);
      socket.off('newChannel', onNewChannel);
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(addChannels(token));
    dispatch(setMessages(token));
  }, [dispatch, token]);

  return (
    <>
      <Container className=' h-100 my-4 overflow-hidden rounded shadow'>
        <Row className='h-100 bg-white flex-md-row'>
          <Channels />
          <Chat />
        </Row>
      </Container>
      <ModalWindow />
      <ModalNotification />
    </>
  );
};
export default MainPage;
