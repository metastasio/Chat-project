import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import { addChannels } from '../store/channelsSlice';
import { setMessages } from '../store/chatSlice';
import Channels from './Channels';
import Chat from './Chat';

const MainPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authorization);

  useEffect(() => {
    dispatch(addChannels(token));
    dispatch(setMessages(token));
  });

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
