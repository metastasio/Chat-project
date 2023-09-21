import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { changeChannel } from '../store/channelsSlice';

const ChannelItem = ({ name, removable, id }) => {
  const dispatch = useDispatch();
  const { currentChannel } = useSelector((state) => state.content);

  const classNames = cn({
    'w-100': true,
    'rounded-0': true,
    'text-start': true,
    btn: true,
    'btn-secondary': currentChannel === id,
  });

  return (
    <li className='nav-item w-100'>
      <button
        type='button'
        className={classNames}
        onClick={() => dispatch(changeChannel(id))}
      >
        <span className='me-1'>#</span>
        {name}
      </button>
    </li>
  );
};
export default ChannelItem;
