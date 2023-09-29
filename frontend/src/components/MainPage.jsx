import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { socket } from '../socket.js';
import Channels from './Channels/Channels';
import Chat from './Chat/Chat';
import ModalSwitcher from './Modals/ModalSwitcher.jsx';
import { showToast } from '../store/modal.slice.js';
import {
  getContent,
  getNewChannel,
  renameChannel,
  removeChannel,
  getNewMessages,
} from '../store/content.slice.js';

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token } = useSelector((state) => state.authorization);

  useEffect(() => {
    socket.connect();

    socket.on('disconnect', () => {
      dispatch(
        showToast({ message: t('toast.networkError'), level: 'warning' }),
      );
    });

    socket.on('connect_error', () => {
      dispatch(
        showToast({ message: t('toast.networkError'), level: 'warning' }),
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
      socket.off('disconnect');
      socket.off('connect_error');
      socket.disconnect();
    };
  }, [dispatch, t]);

  useEffect(() => {
    dispatch(getContent(token))
      .unwrap()
      .catch(() => navigate('/login'));
  }, [dispatch, token, navigate]);

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
