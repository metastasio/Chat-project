const selectChatContent = (state) => state.content;
const selectModal = (state) => state.modal;
const selectToastContent = (state) => state.modal.toast;

export {
  selectChatContent,
  selectModal,
  selectToastContent,
};
