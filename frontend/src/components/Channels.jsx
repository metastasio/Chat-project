import { useSelector } from 'react-redux';

import ChannelItem from './ChannelItem';

const Channels = () => {
  const { entities } = useSelector((state) => state.channels);

  return (
    <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
      <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>Каналы</b>
        <button
          type='button'
          className='p-0 text-primary btn btn-group-vertical'
        >
          <span className='me-1'>+</span>
        </button>
      </div>
      <ul
        id='channels-box'
        className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'
      >
        {entities.map((channel) => (
          <ChannelItem key={channel.id} {...channel} />
        ))}
      </ul>
    </div>
  );
};
export default Channels;
