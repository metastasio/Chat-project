import { useSelector } from 'react-redux';
import ModalWindow from './Modal';
import RemoveModal from './RemoveModal.jsx';
import RenameModal from './RenameModal.jsx';

const ModalSwitcher = () => {
  const { type } = useSelector((state) => state.modal);

  if (type === 'createChannel') {
    return <ModalWindow />;
  }
  if (type === 'renameChannel') {
    return <RenameModal />;
  }
  if (type === 'removeChannel') {
    return <RemoveModal />;
  }

};
export default ModalSwitcher;
