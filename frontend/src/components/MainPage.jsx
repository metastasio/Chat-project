import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Channels from './Channels/Channels';
import Chat from './Chat/Chat';
import ModalSwitcher from './Modals/ModalSwitcher.jsx';
import {
  getContent,
  getNewChannel,
  renameChannel,
  removeChannel,
  getNewMessages,
} from '../store/content.slice.js';
import { useAuthContext, useSocketContext } from '../hooks';

const MainPage = () => {
  const { t } = useTranslation();
  const { authData } = useAuthContext();
  const { socket } = useSocketContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.connect();

    socket.on('disconnect', () => {
      toast.error(t('toast.networkError'));
    });

    socket.on('connect_error', () => {
      toast.error(t('toast.networkError'));
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
      socket.off('disconnect');
      socket.off('connect_error');
      socket.disconnect();
    };
  }, [dispatch, t, socket]);

  useEffect(() => {
    dispatch(getContent(authData.token))
      .unwrap()
      .catch(() => navigate('/login'));
  }, [dispatch, authData.token, navigate]);

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
