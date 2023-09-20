const Chat = () => {
  return (
    <div class='col p-0 h-100'>
      <div class='d-flex flex-column h-100'>
        <div class='bg-light mb-4 p-3 shadow-sm small'>
          <p class='m-0'>
            <b># general</b>
          </p>
          <span class='text-muted'>0 сообщений</span>
        </div>
        <div id='messages-box' class='chat-messages overflow-auto px-5 '></div>
        <div class='mt-auto px-5 py-3'>
          <form novalidate='' class='py-1 border rounded-2'>
            <div class='input-group has-validation'>
              <input
                name='body'
                aria-label='Новое сообщение'
                placeholder='Введите сообщение...'
                class='border-0 p-0 ps-2 form-control'
                value=''
              />
              <button type='submit' disabled='' class='btn btn-group-vertical'>
                <span class='me-1'>Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Chat;
