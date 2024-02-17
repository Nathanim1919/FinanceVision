import React from 'react';
import {styled} from 'styled-components'
const Input = ({
  type = 'text',
  placeholder = '',
  value = '',
  onChange = () => {},
  error = '',
  disabled = false,
  ...props
}) => {
  return (
    <Container className="input-container">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props} // Pass rest props to the input element
      />
      {error && <div className="error">{error}</div>}
    </Container>
  );
};

export default Input;


const Container = styled.div`
   padding:0 0.5rem;
   display: grid;
   place-items: center;
   position: relative;

   .error{
    place-self: center;
    color:#981010;
    width: 100%;
    padding:0.1rem 0.4rem;
    margin-top: .2rem;
    font-size: .6rem;
    position: absolute;
    bottom: -45%;

    @media screen and (max-width: 600px){
      position: relative;
      bottom: 0;
    }
   }

   input{
    padding: 0.6rem;
    width: 100%;
    border: 1px solid #d1d1d1;
   }

   input[type="submit"]{
    background-color: #3294f0;
    width: 100%;
    border: 1px solid #3294f0;
    color: #fff;
    cursor: pointer;


    &:hover{
      background-color: #8cbce8;
    }
   }
`