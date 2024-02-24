import React, {useState} from 'react';
import ExpenseForm from '../../components/forms/ExpenseForm';
import { IoMdAdd } from "react-icons/io";
import styled, { keyframes } from 'styled-components';
import { CiCalendarDate, CiEdit, CiViewTimeline } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";

const sampleExpenses = [
  {
    id: 1,
    frequency:"OneTime",
    date: '2024-02-22',
    category: 'Groceries',
    amount: -150.00,
    merchant: 'Supermarket X',
    description: 'Monthly grocery shopping',
  },
  {
    id: 1,
    frequency:"Monthlly",
    date: '2024-02-22',
    category: 'Groceries',
    amount: -150.00,
    merchant: 'Supermarket X',
    description: 'Monthly grocery shopping',
  },
  {
    id: 1,
    frequency:"OneTime",
    date: '2024-02-22',
    category: 'Groceries',
    amount: -450.00,
    merchant: 'Supermarket X',
    description: 'Monthly grocery shopping',
  },
  {
    id: 1,
    frequency:"OneTime",
    date: '2024-02-22',
    category: 'Groceries',
    amount: -100.00,
    merchant: 'Supermarket X',
    description: 'Monthly grocery shopping',
  },
  {
    id: 1,
    frequency:"Monthlly",
    date: '2024-02-22',
    category: 'Groceries',
    amount: -90.00,
    merchant: 'Supermarket X',
    description: 'Monthly grocery shopping',
  },
  {
    id: 1,
    frequency:"OneTime",
    date: '2024-02-22',
    category: 'Groceries',
    amount: -30.00,
    merchant: 'Supermarket X',
    description: 'Monthly grocery shopping',
  },
  {
    id: 1,
    frequency:"Annually",
    date: '2024-02-22',
    category: 'Groceries',
    amount: -50.00,
    merchant: 'Supermarket X',
    description: 'Monthly grocery shopping',
  },
  {
    id: 1,
    frequency:"OneTime",
    date: '2024-02-22',
    category: 'Groceries',
    amount: -150.00,
    merchant: 'Supermarket X',
    description: 'Monthly grocery shopping',
  },
  {
    id: 2,
    frequency:"Monthlly",
    date: '2024-02-20',
    category: 'Utilities',
    amount: -150.00,
    merchant: 'Electric Company',
    description: 'Electricity bill payment',
  },
];



const Container = styled.div`
    /* background-color: blue; */
    color: #333;
    
`


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
    const [createExpense, setCreateExpense] = useState(false)
  return (
    <Container>
        {createExpense && <ExpenseForm setCreateExpense={setCreateExpense}/>}
        <Content>

            <Header>
                <h2>Nathan's expenses</h2>
                <div className='icon' onClick={()=>setCreateIncome(true)}>
                    <IoMdAdd/>
                </div>
            </Header>
        <IncomeBox>
            {sampleExpenses.map(income => (
                <div key={income.id}>
                    <div>
                        <h3><TbCategoryFilled/>{income.category}</h3>
                        <p><CiCalendarDate/>{income.date}<span className='frequency'>{income.frequency}</span></p>
                    </div>
                    <div>
                        <h3><FaMoneyBillWave/>{income.amount} <span>BIRR</span></h3>
                        {/* <p>{income.description}</p> */}
                        <p><CiViewTimeline/>{income.merchant}</p>
                    </div>
                    <div className='icons'>
                        <div className='edit'>
                            <CiEdit/>
                        </div>
                        <div className='delete'>
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
