const MessageItem = ({ body, username }) => {
  return (
    <p className='w-100'>
      <span className='fw-bold'>{username}</span>: {body}
    </p>
  );
};
export default MessageItem;
