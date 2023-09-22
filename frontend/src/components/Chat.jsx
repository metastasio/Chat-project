import { useSelector } from 'react-redux';
// import { Container, Col } from 'react-bootstrap';

const Chat = () => {
  const { entities, currentChannel } = useSelector((state) => state.channels);
  const { messages } = useSelector((state) => state.chats);

  const getActiveChannel = (element) => element.id === currentChannel;
  const name = entities.find(getActiveChannel);

  const chatMessages = messages.filter(message => message.channelId === currentChannel);

  return (
    <div className='col p-0 h-100'>
      <div className='d-flex flex-column h-100'>
        <div className='bg-light mb-4 p-3 shadow-sm small'>
          <p className='m-0'>
            <b># {name?.name}</b>
          </p>
          <span className='text-muted'>{chatMessages.length} сообщений</span>
        </div>
        <div
          id='messages-box'
          className='chat-messages overflow-auto px-5 '
        ></div>
        <div className='mt-auto px-5 py-3'>
          <form novalidate='' className='py-1 border rounded-2'>
            <div className='input-group has-validation'>
              <input
                name='body'
                aria-label='Новое сообщение'
                placeholder='Введите сообщение...'
                className='border-0 p-0 ps-2 form-control'
                value=''
              />
              <button
                type='submit'
                disabled=''
                className='btn btn-group-vertical'
              >
                <span className='me-1'>Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Chat;
