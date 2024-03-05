import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoSettings } from "react-icons/io5";
import styled from 'styled-components';
import { GrCurrency } from "react-icons/gr";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";




export const Settings = () => {
  const [showCurrency, setShowCurrency] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); 
  const supportedCurrencies = ['USD', 'ETB']; 
  const user = useSelector(state => state.auth.user);

  // Optional: Fetch currency rates based on your implementation
  const [currencyRates, setCurrencyRates] = useState({}); // State for currency rates
  const [minimumAmount, setMinimumAmount] = useState(user.minimumAmount); // State for minimum amount
  
  useEffect(() => {
    const fetchRates = async () => {
      const response = await axios.get('https://api.exchangerate.host/latest?base=USD');
    //   const data = await response.json();
      console.log(response);
    //   setCurrencyRates(data.rates);
    };
    fetchRates();
  }, []);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const updateMinimumAmount = async (event) => {
    event.preventDefault();
    // Update the user's minimum amount
    const response =await axios.patch(`http://localhost:3000/api/v1/settings`, { userId:user._id,minimumAmount });
    console.log(response);

  }

  return (
    <Container className="settings-container">
        <Content>
            <h2><IoSettings/>Settings</h2>
            <div className="currency-settings">
                <h3><GrCurrency/>Currency</h3>
                <div>
                    <h3 className='dropDown' onClick={()=>setShowCurrency(!showCurrency)}>{selectedCurrency}{showCurrency?<MdKeyboardArrowUp/>:<MdKeyboardArrowDown/>}</h3>
                    {showCurrency && <div className='currencyPage'>
                        {supportedCurrencies.map((currency) => (
                            <li onClick={(e)=>{setSelectedCurrency(e.target.innerText); setShowCurrency(false)}}>{currency}</li>
                        ))}
                    </div>}
                </div>
            </div>
            <div className="userSettings">
                    <h3>Low Balance Range</h3>
                    <div>
                        <form onSubmit={updateMinimumAmount}>
                            <input type="number" placeholder='Minimum Value' id="darkMode" name="darkMode" value={minimumAmount} onChange={(e)=>setMinimumAmount(e.target.value)}/>
                            <button type='submit'>Update</button>
                        </form>
                    </div>
            </div>  
         </Content>
    </Container>
  );
};

const Container = styled.div`

    h3{
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .dropDown{
        cursor: pointer;
        background-color: #bedffd;
        padding: 0.4rem .7rem;
    }

    .userSettings{
        display: flex;
        align-items: center;
        gap: 1rem;
    
        form{
            display: flex;
            align-items: center;

            *{
                margin: 0;
                padding: 0.3rem 1rem;
                border:1px solid #eee;
                outline: none;
            }

            button{
                background-color: blue;
                color: #fff;
                box-shadow: 0 5px 23px #54535347;
                cursor: pointer;

                &:hover{
                    background-color: #1e90ff;
                }
            }
        }
    }
`


const Content = styled.div`
    width: 60%;
    margin: 0 auto;


    h2{
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .currencyPage{
        position: absolute;
        list-style-type: none;
        transition: all 0.3s ease-in-out;
        animation: animate 0.4s ease-in-out;

        >li{
            padding: .5rem;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
            border-bottom: 1px solid #eee;

            &:hover{
                background-color: #bdb8b8;
            }
        }
    }

    @keyframes animate {
        from{
            opacity: 0;
            transform: translateY(20px);
        }
        to{
            opacity: 1;
            transform: translateY(0);
        }
    }


    >div{
        display: flex;
        align-items: center;
        gap: 2rem;
    }
`