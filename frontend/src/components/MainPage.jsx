import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setChatContent } from '../store/channelsSlice';
import Channels from './Channels';
import Chat from './Chat';

const MainPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authorization);

  useEffect(() => {
    dispatch(setChatContent(token));
  });

  return (
    <div className='container h-100 my-4 overflow-hidden rounded shadow'>
      <div className='row h-100 bg-white flex-md-row'>
        <Channels />
        <Chat />
      </div>
    </div>
  );
};
export default MainPage;
