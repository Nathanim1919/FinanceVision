import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";


const Header = styled.div`
    background-color: #4791ff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 0 2rem;

    .logo h3 span{
        color: gold;
    }
`

const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: .5rem;

    >div.profileImage{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: aliceblue;
    }
`

function HeaderLayout() {
  const user = useSelector(state => state.auth.user);
  return (
    <Header>
        <div className="logo">
            <h3>F<span>vision</span></h3>
        </div>

        <Profile className="profile">
            <div className="profileImage"></div>
            <div className="profileName">
                <p>{user.username}</p>
            </div>
        </Profile>
    </Header>
  );
}


export default HeaderLayout;