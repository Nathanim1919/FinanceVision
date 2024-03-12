import React, {useState, useEffect} from 'react';
import ExpenseForm from '../../components/forms/ExpenseForm';
import { IoMdAdd } from "react-icons/io";
import styled, { keyframes } from 'styled-components';
import { CiCalendarDate, CiEdit, CiViewTimeline } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses, deleteExpense } from '../../features/expenses/expenseSlice';
import { Loader } from '../../components/Loader';
import { selectUser } from '../../features/auth/authSlice';
import { formatDate } from '../../utils/Formatting';


const Container = styled.div`
    /* background-color: blue; */
    color: #333;
    margin: 0 auto;
    height: 85vh;
    overflow-y: auto;
    
`

8
const Content = styled.div`
    width: 60%;
    margin: 0 auto;
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
const IncomeBox = styled.div`
        display: grid;
        gap: .5rem;
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
    >div{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        padding: 0.5rem;
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
            opacity: .5;
            >div.icons{
                >div{
                    opacity: 1;
                }
            }
        }

        

        >div{
            display: flex;
            flex-direction: column;

            >*{
                margin: 0;

            }

            h3{
                font-size: 1rem;
                display: flex;
                align-items: center;
                gap: .3rem;
            }
            p{
                font-size: .7rem;
                display: flex;
                align-items: center;
                gap: .3rem;

                span{
                    background-color: #87be87;
                    padding:.1rem .3rem;
                    color:#fff;
                    border-radius: 15px;
                }
            }
        }

        >div.icons{
            display: flex;
            align-items: center;
            flex-direction: row;
            gap: .5rem;

            >div{
                background-color: #cecbcb;
                width: 20px;
                height: 20px;
                padding: .2rem;
                border-radius: 50%;
                color: blue;
                cursor: pointer;
                display: grid;
                place-items: center;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.3s ease-in-out;
            }
        }

    }
`

function Expense() {
    const [createExpense, setCreateExpense] = useState(false);
    const isLoading = useSelector(state => state.expense.loading);
    const user = useSelector(selectUser);
    const expenses = useSelector(state => state.expense.expenses);
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(fetchExpenses(user._id));
    },[dispatch, user]);


    const handleDeleteExpense = (id) => {
        dispatch(deleteExpense(id, user._id));
        dispatch(fetchExpenses(user._id));
    }


  return (
    isLoading ? <Loader/> :
    <Container>
        {createExpense && <ExpenseForm setCreateExpense={setCreateExpense}/>}
        <Content>
            <Header>
                <h2>{user.username}'s expenses</h2>
                <div className='icon' onClick={()=>setCreateExpense(true)}>
                    <IoMdAdd/>
                </div>
            </Header>
        <IncomeBox>
            {expenses.length === 0? 
            <div className='emptyListBox'>
                <p>Your expense list is currently empty.</p>
                <p>Start tracking your expenses by creating a new entry.</p>
                <button onClick={()=>setCreateExpense(true)}>Create Expense</button>
            </div>
            :expenses && expenses.slice().reverse().map(income => (
                <div key={income.id}>
                    <div>
                        <h3><TbCategoryFilled/>{income.category}</h3>
                        <p><CiCalendarDate/>{formatDate(income.date)}<span className='frequency'>{income.frequency}</span></p>
                    </div>
                    <div>
                        <h3><FaMoneyBillWave/>{income.amount} <span>BIRR</span></h3>
                        <p><CiViewTimeline/>{income.merchant}</p>
                    </div>
                    <div className='icons'>
                        <div className='edit'>
                            <CiEdit/>
                        </div>
                        <div className='delete' onClick={()=>handleDeleteExpense(income._id)}>
                            <MdDeleteOutline/>
                        </div>
                    </div>
                </div>
            ))}
        </IncomeBox>
        </Content>
    </Container>
  );
}

export default Expense;