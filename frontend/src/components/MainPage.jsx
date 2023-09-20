import Channels from "./Channels";
import Chat from "./Chat";

const MainPage = () => {
  return (
      <div class='container h-100 my-4 overflow-hidden rounded shadow'>
        <div class='row h-100 bg-white flex-md-row'>
        <Channels />
        <Chat />
        </div>
      </div>
  );
};
export default MainPage;
