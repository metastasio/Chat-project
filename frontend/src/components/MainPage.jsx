import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { socket } from '../socket.js';

import { addChannels } from '../store/channelsSlice';
import { setMessages, getNewMessages } from '../store/chatSlice';
import Channels from './Channels';
import Chat from './Chat';

const MainPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authorization);

  useEffect(() => {
    socket.connect();
    dispatch(addChannels(token));
    dispatch(setMessages(token));

    const onNewMessages = (value) => {
      dispatch(getNewMessages(value));
    };

    socket.on('newMessage', onNewMessages);

    return () => {
      socket.off('newMessage', onNewMessages);
      socket.disconnect();
    };
  }, [dispatch, token]);

  return (
    <Container className=' h-100 my-4 overflow-hidden rounded shadow'>
      <Row className='h-100 bg-white flex-md-row'>
        <Channels />
        <Chat />
      </Row>
    </Container>
  );
};
export default MainPage;
