const MessageItem = ({ body, username }) => (
  <p className="w-100">
    <span className="fw-bold">{username}</span>
    :
    {body}
  </p>
);
export default MessageItem;
