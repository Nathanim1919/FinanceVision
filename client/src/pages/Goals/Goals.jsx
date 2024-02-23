import React from 'react'
import styled from 'styled-components'
import { GrLinkNext } from "react-icons/gr";
import { Link } from 'react-router-dom';

export const Goals = () => {

  const goals = [
    {
      title: "Start Investment Portfolio",
      targetAmount: 50000,
      targetDate: "2024-08-31",
      progress: 20,
      description: "Begin building an investment portfolio by August 31st.",
      milestones: [
        {
          title: "Research Investment Options",
          achieved: true,
          date: "2024-03-15"
        },
        {
          title: "Open Investment Account",
          achieved: false,
          date: "2024-04-01"
        }
      ]
    },
  
    // New Goal 5
    {
      title: "Learn a New Language",
      targetAmount: 343120,  // Can set a targetAmount if applicable
      targetDate: "2024-12-31",
      progress: 70,
      description: "Learn a new language by the end of the year.",
      milestones: [
        {
          title: "Complete Beginner Course",
          achieved: true,
          date: "2024-05-01"
        },
        {
          title: "Hold Basic Conversations",
          achieved: false,
          date: "2024-08-15"
        }
      ]
    },
  
    // New Goal 6
    {
      title: "Travel to a New Country",
      targetAmount: 232130,  // Can set a targetAmount if applicable
      targetDate: "2024-11-30",
      progress: 58,
      description: "Explore a new country by the end of November.",
      milestones: [
        {
          title: "Research Potential Destinations",
          achieved: true,
          date: "2024-04-30"
        },
        {
          title: "Book Flights",
          achieved: false,
          date: "2024-06-01"
        }
      ]
    },
    
  ]
  
 
  
  return (
    <Container>
    <div className="header">
      <h2>Goals</h2>
      <Link className='showAllIcon'>
         <GrLinkNext/>
      </Link>
    </div>
    <GoalContainer>
      {goals.map(goal => (
        <div key={goal.title}>
          <div className='titles'>
            <h4>{goal.title}</h4>
            <h4>{goal.targetAmount}</h4>
          </div>
          <div className='progress'>
            <div className='outter'>
              <div style={{ width: `${goal.progress}%` }} className='inner'></div>
            </div>
            <p>778 days left</p>
          </div>
        </div>
      ))}
    </GoalContainer>
    </Container>
  )
}



const Container = styled.div`
  color: #333;

  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem;

    .showAllIcon{
      width: 15px;
      height: 15px;
      display: grid;
      place-items: center;
      background-color: #eee;
      padding: 0.3rem;
      border-radius: 50%;
    }

    >*{
      margin: 0;
      padding: 0;
    }

    h2{
      font-size: 0.8rem;
    }
  }
`

const GoalContainer = styled.div`
  display: grid;
  position: relative;
  /* background-color: red; */
  gap: .5rem;


  >div{
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    color: #333;
  }

  div{
    display: flex;
    padding: 0.3rem;
    flex-direction: column;
    gap: .1rem;
    /* background-color: blue; */

    
    
    >*{ 
      margin: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      padding: 0;

      >*:nth-child(2){
        background-color: #a2dbbf;
        padding:0.1rem 0.4rem;
        border-radius: 20px;
        font-size: .7rem;
        color: #fff;
        display: grid;
        place-items: center;
      }
    }
    h4{
      font-size: .8rem;
    }

    .progress{
      display: grid;
      grid-template-columns: .5fr .4fr;

      .outter{
        width: 100%;
        height: 6px;
        background-color: #eee;
        border-radius: 5px;
        position: relative;
        overflow: hidden;
      }

      .inner{
        height: 100%;
        background-color: #1b76ff;
        position: absolute;
        left: 0;
      }
    }
  }
`