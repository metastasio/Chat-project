const selectChatContent = (state) => state.content;
const selectAccess = (state) => state.authorization;
const selectModal = (state) => state.modal;
const selectToastContent = (state) => state.modal.toast;

export {
  selectAccess,
  selectChatContent,
  selectModal,
  selectToastContent,
};
