const Channels = () => {
  return (
    <div class='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
      <div class='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
        <b>Каналы</b>
        <button type='button' class='p-0 text-primary btn btn-group-vertical'>
          <span class='me-1'>+</span>
        </button>
      </div>
      <ul
        id='channels-box'
        class='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'
      >
        <li class='nav-item w-100'>
          <button
            type='button'
            class='w-100 rounded-0 text-start btn btn-secondary'
          >
            <span class='me-1'>#</span>general
          </button>
        </li>
        <li class='nav-item w-100'>
          <button type='button' class='w-100 rounded-0 text-start btn'>
            <span class='me-1'>#</span>random
          </button>
        </li>
      </ul>
    </div>
  );
};
export default Channels;
