import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Navbar } from 'react-bootstrap';

import { changeChannel } from '../store/channelsSlice';

const ChannelItem = ({ name, removable, id }) => {
  const dispatch = useDispatch();
  const { currentChannel } = useSelector((state) => state.channels);

  const classNames = cn({
    'w-100': true,
    'rounded-0': true,
    'text-start': true,
    btn: true,
    'btn-secondary': currentChannel === id,
  });

  return (

      <Navbar.Brand className='w-100'>
        <Button
          className={classNames}
          onClick={() => dispatch(changeChannel(id))}
        >
          # {name}
        </Button>
      </Navbar.Brand>

  );
};
export default ChannelItem;

// <li className='nav-item w-100'>
//   <button
//     type='button'
//     className={classNames}
//     onClick={() => dispatch(changeChannel(id))}
//   >
//     <span className='me-1'>#</span>
//     {name}
//   </button>
// </li>;
