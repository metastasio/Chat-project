import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../socket';
import { Container, Col, Row, Button, InputGroup, Form } from 'react-bootstrap';

import MessageItem from './MessageItem';
import { showToast } from '../store/modalSlice';
import { useRef } from 'react';

const Chat = () => {
  const dispatch = useDispatch();
  const { entities, currentChannel } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.chats);
  const { username } = useSelector((state) => state.authorization);

  const getActiveChannel = (element) => element.id === currentChannel;
  const chat = entities.find(getActiveChannel);

  const currentChatMessages = messages.filter(
    (message) => message.channelId === currentChannel,
  );
const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    socket.emit(
      'newMessage',
      {
        body: data.get('body'),
        channelId: currentChannel,
        username,
      },
      (payload) => {
        if (payload.status !== 'ok') {
          dispatch(
            showToast('Сообщение не отправлено, проверьте интернет-содениение'),
          );
        }
      },
    );
    formRef.current.reset();
  };

  return (
    <Col className='p-0 h-100 d-flex flex-column'>
      <Container className='bg-light mb-4 p-3 shadow-sm small d-flex flex-column'>
        <span className='m-0 fw-bold'># {chat?.name}</span>
        <span className='text-muted'>
          {currentChatMessages.length} сообщений
        </span>
      </Container>

      <Container className='d-flex flex-column overflow-auto px-5'>
        {currentChatMessages.map((message) => (
          <MessageItem key={message.id} {...message} />
        ))}
      </Container>

      <Container className='mt-auto'>
        <Row className='px-3'>
          <Form onSubmit={handleSubmit} ref={formRef}>
            <InputGroup className='mb-3'>
              <Form.Control
                autoFocus
                aria-describedby='basic-addon2'
                aria-label='Новое сообщение'
                placeholder='Введите сообщение...'
                name='body'
              />
              <Button variant='info' type='submit'>
                Отправить
              </Button>
            </InputGroup>
          </Form>
        </Row>
      </Container>
    </Col>
  );
};
export default Chat;

//  <div className='col p-0 h-100'>
//    <div className='d-flex flex-column h-100'>
//      <div className='bg-light mb-4 p-3 shadow-sm small'>
//        <p className='m-0'>
//          <b># {chat?.name}</b>
//        </p>
//        <span className='text-muted'>{chatMessages.length} сообщений</span>
//      </div>
//      <div id='messages-box' className='chat-messages overflow-auto px-5 '></div>
//      <div className='mt-auto px-5 py-3'>
//        <form
//          noValidate
//          className='py-1 border rounded-2'
//          onSubmit={handleSubmit}
//        >
//          <div className='input-group has-validation'>
//            <input
//              name='body'
//              aria-label='Новое сообщение'
//              placeholder='Введите сообщение...'
//              className='border-0 p-0 ps-2 form-control'
//            />
//            <button type='submit' disabled='' className='btn btn-group-vertical'>
//              <span className='me-1'>Отправить</span>
//            </button>
//          </div>
//        </form>
//      </div>
//    </div>
//  </div>;
