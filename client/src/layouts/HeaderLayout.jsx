import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ProfileImage from '/images/profile.png'
import { Link } from "react-router-dom";


const Header = styled.div`
    background-color: #106bf4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 0 2rem;

    a{
        text-decoration: none;
        color: #fff;

        
    }

    .logo  a h3 sub{
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

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
    }
`

function HeaderLayout() {
  const user = useSelector(state => state.auth.user);
  return (
    <Header>
        <div className="logo">
            <Link to={'/'}>
                <h3>F<sub>vision</sub></h3>
            </Link>
        </div>

        <Profile className="profile">
            <div className="profileImage">
                <img src={ProfileImage} alt="" />
            </div>
            <div className="profileName">
                <p>{user.username}</p>
            </div>
        </Profile>
    </Header>
  );
}


export default HeaderLayout;