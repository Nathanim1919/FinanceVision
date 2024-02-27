import React from 'react'
import styled from 'styled-components'
import { GrLinkNext } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { GoGoal } from "react-icons/go";
import {CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { GiProgression } from "react-icons/gi";
import { TbCategoryFilled } from "react-icons/tb";

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
    <Content>
          <Container>
            <Header>
                  <h2><GoGoal/>Nathan's Goals</h2>
                  <div className='icon' onClick={()=>setCreateIncome(true)}>
                      <IoMdAdd/>
                  </div>
              </Header>
              <GoalContainer>
                {goals.map(goal => (
                  <Card key={goal.title}>
                    <div className='titles'>
                      <h4><TbCategoryFilled/>{goal.title}</h4>
                      <div>
                        <h2><GiProgression/>4000 BIRR</h2>
                        <p className='daysleft'>7 days left</p>
                      </div>
                    </div>
                    <div className='progress'>
                      <div>
                        <div className='outter'>
                          <div style={{ width: `${goal.progress}%` }} className='inner'></div>
                        </div>
                        <h4><span>{goal.progress}</span>%</h4>
                      </div>
                      <h2><GoGoal/>{goal.targetAmount} BIRR</h2>
                    </div>
                    <div className='icons'>
                        <div className='edit'>
                            <CiEdit/>
                        </div>
                        <div className='delete'>
                            <MdDeleteOutline/>
                        </div>
                    </div>
                  </Card>
                ))}
              </GoalContainer>
          </Container>
    </Content>
  )
}


const Content = styled.div`
   margin: 0 auto;
    height: 85vh;
    overflow-y: auto;
`


const Container = styled.div`
  color: #333;
  width: 60%;
  margin: 0 auto;


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
      display: flex;
      align-items: center;
      gap: .5rem;
      font-size: 1rem;
    }
  }
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon{
        background-color: #cecbcb;
        width: 20px;
        height: 20px;
        padding: .4rem;
        border-radius: 50%;
        color: blue;
        cursor: pointer;
        display: grid;
        place-items: center;
    }
`
const GoalContainer = styled.div`
    display: grid;
    gap: 2rem;

    .progress{
      display: flex;
      flex-direction: column;
      flex: 1;

      >*{
        margin: 0;
        padding: 0;

        >*{
        margin: 0;
        padding: 0;
      }
      }
      

      >div{
        display: flex;
        align-items: center;
        justify-content: flex-start;

        h4{
          display: flex;
          align-items: center;
          margin: 0 .4rem;
          color: #989393;
        }

        h4 span{
          background-color: #83b5ff;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: #fff;
          font-size: .9rem;
        }
      }

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
`

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  animation: fadeIn 0.5s ease-in-out;
        
  @keyframes fadeIn {
  from {
      opacity: 0;
      transform: translateY(20px);

  }
  to {
      opacity: 1;
      transform: translateY(0);
  }
}


  &:hover{
    opacity: .7;
  }

  &:hover .icons{
    opacity: 1;
    transform: translateX(0px);
  }

  h2{
    font-size: .9rem;
    display: flex;
    align-items: center;
    gap:.3rem;
    color: #868484;
    font-weight: 500;

    +p.daysleft{
      background-color: green;
      color: #fff;
      font-size: .7rem;
      padding: 0.1rem .5rem;
      border-radius: 10px;
      margin: 0 .3rem;
    }
  }

  .titles{
    display: flex;
    flex-direction: column;

    h4{
      font-size: .9rem;
      display: flex;
      align-items: center;
      gap: .3rem;
    }


    >div{
      display: flex;
      align-items: center;
      padding: 0;
      

      >*{
        margin: 0;
        padding: 0;
      }
    }
    >*{
      margin: 0;
      padding: 0;
    }
  }

  .icons{
    display: flex;
    align-items: center;
    gap: .5rem;
    opacity: 0;
    transform: translateX(30px);
    transition: all .3s ease-in-out;
    font-size: 1.1rem;
    align-self: flex-start;

    >*{
      width: 25px;
      height: 25px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      background-color: #eee;
      color: #333;
      font-size:1.2rem;
    }

  }
`