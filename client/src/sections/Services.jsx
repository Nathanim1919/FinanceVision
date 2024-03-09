import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import CalltoAction from '/images/calltoaction.png'
import manage from '/images/manage.png'
import Card from '/images/card.png'
import Goal from '/images/goal.png'
import Visual from '/images/visual.png'
import Track from '/images/track.png'


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 5rem;
    padding: 2rem 0;


    .header{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 3rem 0;

        >*{
            margin: 0;
        }
    }

    .services{
        display: grid;
        place-items: center;
        /* gap: 5rem; */
        >div{
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 2rem;
            h2{
                background-color: #f3e09c75;
                border-radius: 40px;
            }

            >div{
                flex: 1;
            }

            img{
                width: 100%;
                height: auto;
                object-fit: cover;
            }
        }

        div:nth-child(2),div:nth-child(4){
            flex-direction: row-reverse;
        }

        @media screen and (max-width:768px){
            padding: 2rem;
            >div{
                flex-direction: column;
            }
            div:nth-child(2),div:nth-child(4){
            flex-direction: column;
         }
        }

        
    }

    .footer{
        background-color: #69affe;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
        margin-top: 8rem;
        text-align: left;
        border-radius: 20px;
        position: relative;

        @media screen and (max-width:768px){
            grid-template-columns: 1fr;
        }

        .BackDropimage{
            position: absolute;
            transform: scale(.3);
            top: -105%;
            right: -50%;

            
        @media screen and (max-width:768px){
            top: -40%;
            right: -50%;
        }

            img{
                width: 100%;
                object-fit: cover;
                height: auto;
            }
        }
        }

        .calltoaction{
            background: linear-gradient(to right, #ff0877, #3d84ff);
            display: flex;
            flex-direction: column;
            gap: 1rem;
            position: relative;
            bottom: -30%;
            z-index: 3;
            padding: 2rem; 
            box-shadow: 0 20px 54px rgba(0,0,0,.3);
            color: #fff;

            @media screen and (max-width:768px){
                padding:1rem;
                bottom: 10%;
                margin: 3rem;
            }


            h1{
                color: #ffffff;
            }
            
            >*{
                margin: 0;
            }
        }


        .image{
            position: relative;
            top: -15%;
            left: -1rem;

            @media screen and (max-width:768px){
                top: -10%;
                left: -1rem;
            }
            
            
            img{
                width: 100%;
                height: auto;
                object-fit: cover;
            }
        }


        a{
            padding: 0.4rem 1rem;
            color: #ffffff;
            background-color: #3d84ff;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            text-decoration: none;
            align-self: center;
            position: relative;
        }
`

export default function Services() {
  return (
    <Container id='services'>
        <div className="header">
            <h1>Visualize Your Financial Future</h1>
            <p>Take control of your finances and unlock peace of mind with FVISION's comprehensive suite of tracking and management tools. <br/>Our user-friendly platform empowers you to effortlessly</p>
        </div>

        <div className="services">
            <div>
                <div>
                <img src={Track} alt="" />

                </div>
                <div>
                    <h2>Track Every Penny</h2>
                    <p>Categorize income, expenses, and transactions with ease, gaining a clear picture of your cash flow. No more scrambling for receipts or wondering where your money goes</p>
                </div>
            </div>
            <div>
                <div>
                  <img src={manage} alt="" />
                </div>
                <div>
                    <h2>Effortlessly Manage Expenses</h2>
                    <p>Stay on top of your spending habits with intuitive dashboards and customizable budgets. Set spending limits, receive alerts for overspending, and identify areas for optimization.</p>
                </div>
            </div>
            <div>
                <div>
                 <img src={Goal} alt="" />
                </div>
                <div>
                    <h2>Achieve Your Goals</h2>
                    <p>Whether it's saving for a dream vacation, paying off debt, or securing your future, set personalized financial goals and track your progress in real-time. Stay motivated and celebrate your achievements as you move closer to your aspirations.</p>
                </div>    
            </div>  
            <div>
                <div>
                 <img src={Visual} alt="" />
                </div>
                <div>
                    <h2>Visualize Your Financial Journey</h2>
                    <p>Gain valuable insights with interactive charts and graphs, visualizing your spending patterns, budget adherence, and goal progress. Understand your finances at a glance and make informed decisions for a brighter financial future.</p>
                </div>    
            </div>  
        </div>

        <div className="footer">
            <div className='BackDropimage'>
                <img src={Card} alt="" />
            </div>
            <div className='image'>
              <img src={CalltoAction} alt="" />
            </div>
            <div className='calltoaction'>
                <h1>Ready to Get Started?</h1>
                <p>Join thousands of satisfied users who have taken control of their finances with Fvision.</p>
                <p>Sign up today and experience the difference!</p>
                <Link to={'/register'}>Get Started</Link>
            </div>
        </div>

    </Container>
  )
}
