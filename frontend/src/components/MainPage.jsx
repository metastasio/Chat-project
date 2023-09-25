import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import socket from '../socket.js';
import { getNewMessages } from '../store/chat.slice';
import Channels from './Channels';
import Chat from './Chat';
import ModalSwitcher from './ModalSwitcher.jsx';
import ToastNotification from './ToastNotification.jsx';
import {
  addChannels,
  getNewChannel,
  renameChannel,
  removeChannel,
} from '../store/channels.slice';

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
    const onRenameChannel = (value) => {
      dispatch(renameChannel(value));
    };
    const onRemoveChannel = (value) => {
      dispatch(removeChannel(value));
    };

    socket.on('newMessage', onNewMessages);
    socket.on('newChannel', onNewChannel);
    socket.on('renameChannel', onRenameChannel);
    socket.on('removeChannel', onRemoveChannel);

    return () => {
      socket.off('newMessage', onNewMessages);
      socket.off('newChannel', onNewChannel);
      socket.off('renameChannel', onRenameChannel);
      socket.off('removeChannel', onRemoveChannel);
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(addChannels(token));
  }, [dispatch, token]);

  return (
    <>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Chat />
        </Row>
      </Container>
      <ModalSwitcher />
      <ToastNotification />
    </>
  );
};
export default MainPage;
