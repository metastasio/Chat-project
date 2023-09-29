import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as leoProfanity from 'leo-profanity';
import {
  Container, Col, Row, Button, InputGroup, Form,
} from 'react-bootstrap';

import { handleEmit } from '../../socket';
import MessageItem from './MessageItem';
import { showToast } from '../../store/modal.slice';

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { entities, currentChannel, messages } = useSelector((state) => state.channels);
  const { username } = useSelector((state) => state.authorization);
  const focus = useRef();
  const formRef = useRef();

  useEffect(() => focus.current && focus.current.focus());

  const getActiveChannel = (element) => element.id === currentChannel;
  const chat = entities.find(getActiveChannel);

  const currentChatMessages = messages.filter(
    (message) => message.channelId === currentChannel,
  );
  const messagesInChat = currentChatMessages.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const dataChecked = leoProfanity.clean(data.get('body'));
    handleEmit('newMessage', {
      body: dataChecked,
      channelId: currentChannel,
      username,
    }, () => dispatch(showToast()));
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
          <MessageItem
            key={message.id}
            body={message.body}
            username={message.username}
          />
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
                placeholder={t('messagePlaceHolder')}
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
