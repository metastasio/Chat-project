import { useSelector } from 'react-redux';
import ModalAddChannel from './ModalAddChannel.jsx';
import ModalRenameChannel from './ModalRenameChannel.jsx';
import ModalRemoveChannel from './ModalRemoveChannel.jsx';

const ModalSwitcher = () => {
  const { type } = useSelector((state) => state.modal);

  switch (type) {
    case 'createChannel':
      return <ModalAddChannel />;
    case 'renameChannel':
      return <ModalRenameChannel />;
    case 'removeChannel':
      return <ModalRemoveChannel />;
    default:
      throw new Error();
  }
};
export default ModalSwitcher;
