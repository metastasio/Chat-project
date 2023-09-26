import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import { socket } from '../socket.js';
import Channels from './Channels/Channels';
import Chat from './Chat/Chat';
import ModalSwitcher from './Modals/ModalSwitcher.jsx';
import { showToast } from '../store/modal.slice.js';
import {
  addChannels,
  getNewChannel,
  renameChannel,
  removeChannel,
  getNewMessages,
} from '../store/content.slice.js';

const MainPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authorization);

  useEffect(() => {
    socket.connect();

    socket.on('disconnect', () => {
      dispatch(
        showToast(),
      );
    });

    socket.on('connect_error', () => {
      dispatch(
        showToast(),
      );
    });

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
    </>
  );
};
export default MainPage;
