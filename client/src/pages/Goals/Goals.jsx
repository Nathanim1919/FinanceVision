import React, { useState} from 'react'
import styled from 'styled-components'
// import { GrLinkNext } from "react-icons/gr";
// import { Link } from 'react-router-dom';
import { GoGoal } from "react-icons/go";
import {CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { GiProgression } from "react-icons/gi";
import { TbCategoryFilled } from "react-icons/tb";
import GoalForm from '../../components/forms/GoalForm';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoals, selectLoading , deleteGoal} from '../../features/goals/goalSlice';
import { Loader } from '../../components/Loader';
import { GoalDetails } from './GoalDetails';
import { calculateTimeLeft, formatNumber } from '../../utils/Formatting';
import { FaCheckCircle } from "react-icons/fa";


export const Goals = () => {
  const [createGoal, setCreateGoal] = React.useState(false);
  const isLoading = useSelector(selectLoading);
  const goals = useSelector(selectGoals);
  const [selectGoal, setSelectGoal] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);


  const handleGoalSelect = (goal) => {
    setSelectGoal(goal);
    setShowDetails(true);
  }


  return (
    isLoading ? <Loader/> :
    <Content>
      {(showDetails && selectGoal) && <GoalDetails setShowDetails={setShowDetails} goal={selectGoal}/>}
      {createGoal && <GoalForm setCreateGoal={setCreateGoal}/>}
          <Container>
              <Header>
                  <h2><GoGoal/>{user.username}'s Goals</h2>
                  <div className='icon' onClick={()=>setCreateGoal(true)}>
                      <IoMdAdd/>
                  </div>
              </Header>
              <GoalContainer>
                {goals.length === 0 ? (
                    <div className='emptyListBox'>
                      <p>Your goals list is currently empty.</p>
                      <p>Set financial goals to work towards a brighter future.</p>
                      <button onClick={()=>setCreateGoal(true)}>Create Goal</button>
                  </div>
                     ):goals && goals.map(item => (
                  <Card key={item.title}>
                    <div className='titles'>
                      <h4><TbCategoryFilled/>{(item.title).slice(0, 15)}..<span>{item.category}</span></h4>
                      <div className='current-progress'>
                        <p className='daysleft'>{item.progress === 100?'Completed':calculateTimeLeft(item.startDate, item.deadline)}</p>
                        <h2><GoGoal/>{formatNumber(item.target)} ETB</h2>
                      </div>
                    </div>
                    <div className='progress'>
                      <div>
                        <div className='outter'>
                          <div style={{backgroundColor:item.progress === 100?"#41cc87":"#1b76ff",width: `${item.progress}%`}} className='inner'></div>
                        </div>
                       
                      </div>
                      <div className='target-goal'>
                        <h4>{item.progress === 100?<FaCheckCircle/>:<GiProgression/>}{formatNumber(item.current)} ETB</h4>
                        <div className='percent'>
                             <p>{item.progress}</p>
                             %
                        </div>
                      </div>
                    </div>
                    <div className='icons'>
                        <div className='edit' onClick={()=>handleGoalSelect(item)}>
                            <CiEdit/>
                        </div>
                        <div className='delete' onClick={()=>dispatch(deleteGoal({userId:user._id, goalId:item._id}))}>
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

    @media screen and (max-width: 800px){
      height: 100vh;
    }
`
const Container = styled.div`
  color: #333;
  width: 60%;
  margin: 0 auto;
  @media screen and (max-width: 800px){
    width: 90%;
  }


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

    h2{
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .icon{
        background-color: #eeee;
        width: 20px;
        height: 20px;
        padding: .4rem;
        border-radius: 50%;
        color: #3e3e3f;
        cursor: pointer;
        display: grid;
        place-items: center;
    }
`
const GoalContainer = styled.div`
    display: grid;
    gap: 2rem;

    div.emptyListBox{
        display: flex;
        flex-direction: column;
        align-items: center;

        >*{
            margin: 0;
            font-size: .8rem;
        }

        button{
            background-color: blue;
            color: #fff;
            padding: .3rem .7rem;
            border-radius: 20px;
            cursor: pointer;
            box-shadow: 0 5px 23px #54535347;
            margin-top: 1rem;
            border: none;

            &:hover{
                background-color: #1e90ff;
            }
        
        }
    }


    .progress{
      display: flex;
      flex-direction: column;
      gap: .3rem;
      flex: 1;

      @media screen and (max-width: 800px){
        display: none;
      }

      .target-goal{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: .8rem;
        font-weight: 300;
        padding: 0.1rem .3rem;
        border-radius: 30px;
        background-color: #eee;

        h4{
          display: flex;
          align-items: center;
          gap: .3rem;
          opacity: .8;
          font-weight: 400;
        }
      }

        >*{
          margin: 0;
          padding: 0;

          >*{
          margin: 0;
          padding: 0;
        }
      }
      .percent{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        font-size: .7rem;
      }

      >div{
        display: flex;
        align-items: center;
        justify-content: flex-start;

        h4{
          display: flex;
          align-items: center;
          margin: 0 .4rem;
        }

        h4 span{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: .7rem;
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
        background-color: ${(props) => (props.progress === 100 ? 'green' : '#1b76ff')};
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

  >*:nth-child(1){
    flex: 1;
    width: 100%;
  }
        
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

    .current-progress{
      display: flex;
      align-items: center;
      gap: .5rem;

      h2{
        color: #333;
      }

      p{
        font-size: .7rem;
        background-color: #639463;
        color: #fff;
        padding: 0.1rem .4rem;
        border-radius: 20px;
      }
    }

    h4{
      font-size: .9rem;
      display: flex;
      align-items: center;
      gap: .3rem;

      span{
        font-size: .8rem;
        background-color: #eee;
        font-weight: 300;
        padding:0rem .5rem;
        border-radius: 30px;
        color: #706969;
      }
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