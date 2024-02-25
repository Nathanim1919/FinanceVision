import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoSettings } from "react-icons/io5";
import styled from 'styled-components';
import { GrCurrency } from "react-icons/gr";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";



export const Settings = () => {
  const [showCurrency, setShowCurrency] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); 
  const supportedCurrencies = ['USD', 'ETB']; 

  // Optional: Fetch currency rates based on your implementation
  const [currencyRates, setCurrencyRates] = useState({}); // State for currency rates
  
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
         </Content>
    </Container>
  );
};

const Container = styled.div`
    /* background-color: red; */

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