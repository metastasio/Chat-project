import { createSelector } from '@reduxjs/toolkit';

const selectChatContent = (state) => state.content;
const selectModal = (state) => state.modal;

const selectCurrentChatMessages = (currentChannel) => createSelector(
  (state) => selectChatContent(state),
  (content) => content.messages.filter((message) => message.channelId === currentChannel),
);

const selectNames = createSelector(
  (state) => selectChatContent(state),
  (content) => content.entities.map((entity) => entity.name),
);

export {
  selectChatContent,
  selectModal,
  selectCurrentChatMessages,
  selectNames,
};
