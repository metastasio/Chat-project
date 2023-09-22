import { useSelector } from 'react-redux';
import { Button, Navbar, Nav } from 'react-bootstrap';

import ChannelItem from './ChannelItem';

const Channels = () => {
  const { entities } = useSelector((state) => state.channels);

  return (
    <Navbar className='col-4 bg-light col-md-2 h-100 flex-column px-2'>
      <Nav.Item className='w-100 d-flex justify-content-between mb-1 p-4'>
        <span className='fw-bold'>Каналы</span>
        <Button type='button' variant='outline-primary' size='sm'>
          +
        </Button>
      </Nav.Item>
      {entities.map((channel) => (
        <ChannelItem key={channel.id} {...channel} />
      ))}
    </Navbar>
  );
};
export default Channels;

// <Col className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
//   <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
//     <b>Каналы</b>
//     <Button type='button' variant='outline-primary' size='sm'>
//       +
//     </Button>
//   </div>
//   <ListGroup className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
//     {entities.map((channel) => (
//       <ChannelItem key={channel.id} {...channel} />
//     ))}
//   </ListGroup>
// </Col>;
