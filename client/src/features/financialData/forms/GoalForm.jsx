import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import styled from 'styled-components';


function GoalForm({setCreateGoal}) {

 const [source, setSource] = useState("");
 const [amount, setAmount] = useState(0);
 const [duration, setDuration] = useState('one time'); 


  return (

    <GoalFormContainer>
        <form>
        <div className='header'>
            <h2>Financial Goals</h2>
            <IoClose className='icon' onClick={()=>setCreateGoal(false)}/>
        </div>
            <div>

                <input
                    type="text"
                    placeholder="Enter goal name"
                    //   value={newGoal.name}
                    //   onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                    />
                <input
                    type="number"
                    placeholder="Enter goal amount"
                    //   value={newGoal.amount}
                    //   onChange={(e) => setNewGoal({ ...newGoal, amount: e.target.value })}
                    />
                <input
                    type="text"
                    placeholder="Enter goal category"
                    //   value={newGoal.category}
                    //   onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                    />
                <input
                    type="date"
                    placeholder="Enter target date"
                    //   value={newGoal.targetDate}
                    //   onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                    />
                <input
                    type="text"
                    placeholder="Enter priority"
                    //   value={newGoal.priority}
                    //   onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                    />
                <input
                    type="text"
                    placeholder="Enter risk tolerance"
                    //   value={newGoal.riskTolerance}
                    //   onChange={(e) => setNewGoal({ ...newGoal, riskTolerance: e.target.value })}
                    />
            </div>
                <div>
                <p>Contributions:</p>
                <input
                    type="number"
                    placeholder="Amount"
                    // value={newGoal.contributions.amount || ''}
                    // onChange={(e) => setNewGoal({ ...newGoal, contributions: { ...newGoal.contributions, amount: e.target.value } })}
                />
                <select
                    // value={newGoal.contributions.frequency || 'Monthly'}
                    // onChange={(e) => setNewGoal({ ...newGoal, contributions: { ...newGoal.contributions, frequency: e.target.value } })}
                >
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    {/* Add more frequency options as needed */}
                </select>
            </div>
            
            <div>
                <label>
                    Tracking Progress:
                    <input
                    type="checkbox"
                    //   checked={newGoal.trackingProgress}
                    //   onChange={() => setNewGoal({ ...newGoal, trackingProgress: !newGoal.trackingProgress })}
                    />
                </label>
            </div>

            <textarea
                placeholder="Enter notes"
                //   value={newGoal.notes}
                //   onChange={(e) => setNewGoal({ ...newGoal, notes: e.target.value })}
                />
            <button>Add Goal</button>
        </form>
      </GoalFormContainer>
  )
}
export default GoalForm;


const GoalFormContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background-color: #00000020;
    backdrop-filter: blur(3px);
    z-index: 10;

    form{

        input{
            padding: 0.7rem 1.2rem;
            border: 1px solid #eee;
            outline: none;
        }
        >div{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
        }
        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;

            .icon{
                border-radius: 50%;
                background-color: #eee;
                padding: 0.5rem;
                cursor: pointer;

                &:hover{
                    background-color: #ddd;
                }
            }
        }
        background-color: #fff;
        padding: 2rem;
        width: 70%;
    }
`;