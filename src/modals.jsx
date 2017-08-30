// import React from 'react';

// import ModalContentContainer from './containers/ModalContentContainer';

// /**
//  *
//  */
// export default (
//   <div>
//     {
//       <ModalContentContainer
//         modalType="video"
//         backdrop={true}
//         shouldShow={data => {
//           return data.type == 'VideoModal';
//         }}
//         getContent={done => {
//           require.ensure(
//             [],
//             require => {
//               done(null, require('./modals/VideoModal/index.jsx'));
//             },
//             'modals'
//           );
//         }}
//       />
//     }
//   </div>
// );
