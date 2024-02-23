import React from 'react';
import styled from 'styled-components';
import { selectUser } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import ExpensePieChart from '../components/graphs/PieChar';
import { Goals } from './Goals/Goals';
import welcomeImage from '/images/welcome.png';
import BardGraph from '../components/graphs/barGrapgh';
import { Transactions } from './Transactions/Transactions';
import Notification from './Notification';

const Container = styled.div`
   padding:1rem;
   display: grid;
   gap: .5rem;
   color: #fff;
   height: 89vh;

   >*{
    flex: 1;
   }

   .firstData{
    display: flex;
    flex-direction: column;

    >*{
      flex: 1;
      gap: .5rem;
    }
   }
   .welocmepage{
      background-color: #2c98f7;
      display: flex;
      justify-content: space-around;
      align-items: center;
      max-height: 15vh;

      div.welcomeText{
        display: flex;
        height: 100%;
        gap: 1rem;
        position: relative;
        

        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.3);
        }
        div:nth-child(2){
          display: flex;
          flex-direction: column;
          margin-top: 1rem;
          
    
          >*{
            margin: 0;
          }
        }
      }

   }

   .datas{
     display: grid;
     grid-template-columns: repeat(3, 1fr);
     height: 100%;
     gap: .6rem;

     .bottomGrid{
      display: flex;
      gap: .5rem;
      

      >div{
        flex: 1;
        padding: 0.5rem;
      }
     }
     
     >*{
      padding: .3rem;
      /* background-color: #12123f; */
     }


     div:nth-child(1){
      grid-row:span 2;
      /* background-color: red; */
      
     }
     div:nth-child(4){
      grid-column:span 2;
      grid-row: span 1;
      /* background-color: red; */
     }
   }

   .data2{
      /* background-color: red; */
      height: 200px;
      width: 100%;
   }
`

export const Dashboard = () => {
  // const user = useSelector(selectUser);
  return (
    <Container>
       <div className="welocmepage">
          <div className='welcomeText'>
            <div>
              <img src={welcomeImage} alt=''/>
            </div>
            <div>
              <h3>Welocme Back Nathanim</h3>
              <p>Save, Track, Invest and Grow Exponentially</p>
            </div>
          </div>

          <div className="amount">
            <h2>******* ETB</h2>
          </div>
       </div>
       <div className="datas">
          <div className='firstData'>
            <div>
              <Goals/>
            </div>
            <div style={{
                display:"grid",
                placeItems:"center"
              }}>
            <ExpensePieChart />
            </div>
          </div>
          <div>
              <BardGraph/>
          </div>
          <div>
              <Notification/>
          </div>
          <div className='bottomGrid'>
             <div>
                <Transactions/>
             </div>
             <div style={{
              display:"grid",
              placeItems:"center"
            }}><ExpensePieChart/></div>
          </div>
       </div>
    </Container>
  )
}

