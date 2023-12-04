import React from 'react';
import styled from 'styled-components';

function Loading() {
  return (
    <Spinnner class = "spinner" > </Spinnner>
  )
}

export default Loading;


const Spinnner = styled.div`
   position: relative;
   width: 56px;
   height: 56px;
   display: flex;
   align-items: center;
   justify-content: center;

&::before,
&::after {
   border: 6.7px solid #474bff;
   border-radius: 50%;
   position: absolute;
   content: '';
   display: block;
}

&::before {
   width: 33.6px;
   height: 33.6px;
   border-bottom-color: transparent;
   border-left-color: transparent;
   animation: spinner-1o3y8q 0.75s infinite linear reverse;
}

&::after {
   animation: spinner-1o3y8q 0.5s infinite linear;
   height: 56px;
   width: 56px;
   border-right-color: transparent;
   border-top-color: transparent;
}

@keyframes spinner-1o3y8q {
   to {
      transform: rotate(360deg);
   }
}
`