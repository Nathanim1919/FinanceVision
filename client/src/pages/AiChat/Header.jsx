import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaArrowLeftLong } from "react-icons/fa6";

// eslint-disable-next-line react/prop-types
function Header({setOpenChat}) {
  const user = useSelector((state) => state.auth.user)
  return (
    <Container>
      <div onClick={()=> setOpenChat(false)}>
        <FaArrowLeftLong/>
      </div>
        <div>
        <h3>{user.username}</h3>
        </div>

    </Container>
  )
}

export default Header;


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color:#fff;

    *{

        padding: 0 1rem;
    }

    div:nth-child(1){
    
      cursor: pointer;
    }
`
