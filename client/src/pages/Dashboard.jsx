import React, {useState} from 'react';
import styled from 'styled-components';
import { selectUser } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import ExpensePieChart from '../components/graphs/PieChar';
import { Goals } from '../components/dashoardComponents/goals';
import welcomeImage from '/images/coin.png';
import BardGraph from '../components/graphs/barGrapgh';
import Notification from '../components/dashoardComponents/Notification';
import { Transactions } from '../components/dashoardComponents/Transactions';
import FinancialBarChart from '../components/graphs/BarChart';
import IncomeForm from '../components/forms/IncomeForm';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


const Container = styled.div`
   padding:1rem;
   display: grid;
   grid-template-rows: .1fr .9fr;
   overflow: hidden;
   /* height: 100%; */
   gap: .5rem;
   color: #fff;

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
      background-color: #fff351;
      display: flex;
      align-items: center;
      max-height: 12vh;
      color: #000;
      padding:0 1rem;
      box-shadow: 0 17px 33px rgba(0, 0, 0, 0.1);

      >*{
        padding: 0;
        margin: 0;
      }

      div.amount{
        width: 100%;
        display: flex;
        align-items: center;
        gap: 2rem;


        >div{
          width: 35px;
          height: 35px;
          background-color: #ada52c;
          color: #333;
          display: grid;
          place-items: center;
          font-size: 1.4rem;
          border-radius: 50%;
          cursor: pointer;
        }
        }

      div.welcomeText{
        display: flex;
        height: 100%;
        position: relative;


        img{
          width: 100%;
          height: 100%;
          position: relative;
          object-fit: cover;
          transform: scale(.8);
          
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
  const user = useSelector(selectUser);
  const [show, setShow] = useState(false);
  return (
    <Container>
       <div className="welocmepage">
          <div className='welcomeText'>
            <div>
              <img src={welcomeImage} alt=''/>
            </div>
            <div>
              <h3>Hi, {(user.username)[0].toUpperCase() + (user.username).slice(1)}</h3>
              <p>Save, Track, Invest and Grow Exponentially</p>
            </div>
          </div>

          <div className="amount">
            <h2>{show?"*******":"400,000"} ETB</h2>
            <div onClick={()=>setShow(!show)}>
              {show?<FaEye/>:<FaEyeSlash/>}
            </div>
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
           <FinancialBarChart/>
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

