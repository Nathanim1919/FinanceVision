import React,{useState} from 'react';
import { IoMdAdd } from "react-icons/io";
import styled from 'styled-components';
import { CiCalendarDate, CiEdit, CiViewTimeline } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";
import IncomeForm from '../../components/forms/IncomeForm';


const sampleIncomes = [
  {
    id: 1,
    date: '2024-02-25',
    category: 'Salary',
    amount: 2500.00,
    description: 'Monthly salary from Company X',
    frequency: 'monthly',
  },
  {
    id: 2,
    date: '2024-02-20',
    category: 'Freelance',
    amount: 800.00,
    description: 'Freelance project payment',
    frequency: 'onetime',
  },
  {
    id: 1,
    date: '2024-02-25',
    category: 'Salary',
    amount: 2500.00,
    description: 'Monthly salary from Company X',
    frequency: 'monthly',
  },
  {
    id: 2,
    date: '2024-02-20',
    category: 'Freelance',
    amount: 800.00,
    description: 'Freelance project payment',
    frequency: 'onetime',
  },
  {
    id: 1,
    date: '2024-02-25',
    category: 'Salary',
    amount: 2500.00,
    description: 'Monthly salary from Company X',
    frequency: 'monthly',
  },
  {
    id: 2,
    date: '2024-02-20',
    category: 'Freelance',
    amount: 800.00,
    description: 'Freelance project payment',
    frequency: 'onetime',
  },
  {
    id: 1,
    date: '2024-02-25',
    category: 'Salary',
    amount: 2500.00,
    description: 'Monthly salary from Company X',
    frequency: 'monthly',
  },
  {
    id: 2,
    date: '2024-02-20',
    category: 'Freelance',
    amount: 800.00,
    description: 'Freelance project payment',
    frequency: 'onetime',
  },
  {
    id: 1,
    date: '2024-02-25',
    category: 'Salary',
    amount: 2500.00,
    description: 'Monthly salary from Company X',
    frequency: 'monthly',
  },
  {
    id: 2,
    date: '2024-02-20',
    category: 'Freelance',
    amount: 800.00,
    description: 'Freelance project payment',
    frequency: 'onetime',
  },
  {
    id: 1,
    date: '2024-02-25',
    category: 'Salary',
    amount: 2500.00,
    description: 'Monthly salary from Company X',
    frequency: 'monthly',
  },
  {
    id: 2,
    date: '2024-02-20',
    category: 'Freelance',
    amount: 800.00,
    description: 'Freelance project payment',
    frequency: 'onetime',
  },
  // Add more sample incomes as needed
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
        transition: opacity 0.3s ease-in-out;

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
function Income() {
    const [createIncome, setCreateIncome] = useState(false);
  return (
    <Container>
        {createIncome && <IncomeForm setCreateIncome={setCreateIncome}/>}
        <Content>

            <Header>
                <h2>Income Page</h2>
                <div className='icon' onClick={()=>setCreateIncome(true)}>
                    <IoMdAdd/>
                </div>
            </Header>
        <IncomeBox>
            {sampleIncomes.map(income => (
                <div key={income.id}>
                    <div>
                        <h3><TbCategoryFilled/>{income.category}</h3>
                        <p><CiCalendarDate/>{income.date}</p>
                    </div>
                    <div>
                        <h3><FaMoneyBillWave/>{income.amount} <span>BIRR</span></h3>
                        {/* <p>{income.description}</p> */}
                        <p><CiViewTimeline/>{income.frequency}</p>
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

export default Income;
