// import { Toast, ToastContainer } from 'react-bootstrap';
// import { useSelector, useDispatch } from 'react-redux';
// import cn from 'classnames';

// import { closeToast } from '../../store/modal.slice';
// import { selectToastContent } from '../../services/stateSelectors';

// const ToastNotification = () => {
//   const { open, level, message } = useSelector(selectToastContent);
//   const classNames = cn({
//     'bg-warning':
//     level === 'warning',
//   });
//   const dispatch = useDispatch();

//   return (
//     <ToastContainer position="top-center">
//       <Toast
//         onClose={() => dispatch(closeToast())}
//         show={open}
//         delay={2500}
//         autohide
//         className={classNames}
//       >
//         <Toast.Body>
//           <p className="text-center">{message}</p>
//         </Toast.Body>
//       </Toast>
//     </ToastContainer>
//   );
// };

// export default ToastNotification;
