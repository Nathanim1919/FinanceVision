import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import styled from 'styled-components';


function IncomeForm({setAddIncome}) {

 const [source, setSource] = useState("");
 const [amount, setAmount] = useState(0);
 const [duration, setDuration] = useState('one time'); 


  return (
    <Container className='overlay'>
        <div>
            <IoClose onClick={()=>setAddIncome(false)} className='closeIcon'/>
            <form>
                <input value={source} onChange={(e)=>setSource(e.target.value)} type='text' placeholder='Enter source'/>
                <input value={amount} onChange={(e)=>setAmount(e.target.value)} type='number' placeholder='Enter Amount'/>
                <input value={duration} type='text' placeholder='When will you get it?' />
                <div className='options'>
                    <p onClick={(e)=>setDuration(e.target.value)}>One time</p>
                    <p onClick={(e)=>setDuration(e.target.value)}>Every Day</p>
                    <p onClick={(e)=>setDuration(e.target.value)}>Every week</p>
                    <p onClick={(e)=>setDuration(e.target.value)}>Every month</p>
                    <p onClick={(e)=>setDuration(e.target.value)}>Annually</p>
                </div>
                <input type='submit' value={"Add"} />
            </form>
        </div>
    </Container>
  )
}
export default IncomeForm;


const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #00000029;
    backdrop-filter: blur(3px);
    z-index: 10;
    display: grid;
    place-items: center;

    >div{
        background-color: #fff;
        position: relative;
        padding: 3rem;
        box-shadow: 0 8px 34px rgba(0, 0, 0, 0.067);
        border-radius: 5px;

        .closeIcon{
            position: absolute;
            top: .5rem;
            right: .5rem;
            cursor: pointer;

            &:hover{
                color: #ddd;
            }
        }

        form{
            display: flex;
            flex-direction: column;
            gap:1rem;

            .options{
                display: flex;
                flex-direction: column;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.161);
                position: absolute;
                bottom: 0;
                right: 0;
                background-color: #fff;

                >*{
                    margin: 0;
                    font-size: .8rem;
                    color:#4b4949;
                    padding:.2rem .5rem;
                    cursor: pointer;
                    border-bottom: 1px solid #ddd;
                    
                    &:hover{
                        background-color: #eee;
                    }
                    
                }
            }
    
            input{
                padding: 0.5rem 1rem;
                border: 1px solid #eee;
                outline: none;
            }
    
            input[type="submit"]{
                background-color: blue;
                color: #fff;
            }
        }
    }
`