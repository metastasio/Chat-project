import { useSelector } from 'react-redux';
import ModalAddChannel from './ModalAddChannel.jsx';
import ModalRenameChannel from './ModalRenameChannel.jsx';
import ModalRemoveChannel from './ModalRemoveChannel.jsx';
import { selectModal } from '../../store/stateSelectors';

const ModalSwitcher = () => {
  const { type } = useSelector(selectModal);

  switch (type) {
    case 'createChannel':
      return <ModalAddChannel />;
    case 'renameChannel':
      return <ModalRenameChannel />;
    case 'removeChannel':
      return <ModalRemoveChannel />;
    default:
      return null;
  }
};
export default ModalSwitcher;
