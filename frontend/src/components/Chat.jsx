import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container, Col, Row, Button, InputGroup, Form,
} from 'react-bootstrap';

import socket from '../socket';
import MessageItem from './MessageItem';
import { showToast } from '../store/modal.slice';

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { entities, currentChannel } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.chats);
  const { username } = useSelector((state) => state.authorization);
  const focus = useRef();

  useEffect(() => focus.current && focus.current.focus());

  const getActiveChannel = (element) => element.id === currentChannel;
  const chat = entities.find(getActiveChannel);

  const currentChatMessages = messages.filter(
    (message) => message.channelId === currentChannel,
  );
  const messagesInChat = currentChatMessages.length;
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
    <Col className="p-0 h-100 d-flex flex-column">
      <Container className="bg-light mb-4 p-3 shadow-sm small d-flex flex-column">
        <span className="m-0 fw-bold">
          #
          {chat?.name}
        </span>
        <span className="text-muted">
          {t('key', { count: messagesInChat })}
        </span>
      </Container>

      <Container className="d-flex flex-column overflow-auto px-5">
        {currentChatMessages.map((message) => (
          /* eslint-disable react/jsx-props-no-spreading */
          <MessageItem key={message.id} {...message} />
        ))}
      </Container>

      <Container className="mt-auto">
        <Row className="px-3">
          <Form onSubmit={handleSubmit} ref={formRef}>
            <InputGroup className="mb-3">
              <Form.Control
                autoFocus
                aria-describedby="basic-addon2"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                name="body"
                ref={focus}
              />
              <Button variant="info" type="submit">
                {t('sendMessage')}
              </Button>
            </InputGroup>
          </Form>
        </Row>
      </Container>
    </Col>
  );
};

export default Chat;
