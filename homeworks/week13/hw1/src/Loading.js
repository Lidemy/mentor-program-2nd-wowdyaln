import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.css';


const Loading = ({ type, color }) => (
      <ReactLoading className="loading" type={type} color={color} height={'10%'} width={'10%'} />
);

/* //*Loading Types

blank
balls
bars
bubbles
cubes
cylon
spin
spinningBubbles
spokes

*/

export default Loading;

