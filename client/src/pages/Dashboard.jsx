import React from 'react';
import styled from 'styled-components';
import { selectUser } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';

const Container = styled.div`
   padding:1rem;
   display: grid;
   gap: .5rem;

   .welocmepage{
    background-color: #2c98f7;
    display: flex;
    justify-content: space-around;
    align-items: center;

    div:nth-child(1){
      display: flex;
      flex-direction: column;
      

      >*{
        margin: 0;
      }
    }
   }

   .datas{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;


    >*{
      background-color: red;
      height: 230px;
    }
   }

   .data2{
      background-color: red;
      height: 200px;
      width: 100%;
   }
`

export const Dashboard = () => {
  const user = useSelector(selectUser);
  return (
    <Container>
       <div className="welocmepage">
          <div>
             <h1>Welocme Back {user.username}</h1>
             <p>Save, Track, Invest and Grow Exponentially</p>
          </div>

          <div className="amount">
            <h1>******* ETB</h1>
          </div>
       </div>
       <div className="datas">
           <div></div>
           <div></div>
           <div></div>
       </div>

       <div className="data2">

       </div>
    </Container>
  )
}
