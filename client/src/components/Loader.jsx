import styled from "styled-components";

export const Loader = () => {
  return (
<Container>
    <Loading class="loader">
    </Loading>
</Container>
  )
}
/* HTML: <div class="loader"></div> */
const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    z-index: 22;
    background-color: #ffffffd5;
    backdrop-filter: blur(1px);
`
const Loading = styled.div `
    width: 50px;
    padding: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #010101b2;
    --_m: 
      conic-gradient(#0000 10%,#000),
      linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
            mask: var(--_m);
    -webkit-mask-composite: source-out;
            mask-composite: subtract;
    animation: l3 1s infinite linear;
    @keyframes l3 {to{transform: rotate(1turn)}}

  `