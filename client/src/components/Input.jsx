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

   .error{
    place-self: center;
    color:#981010;
    width: 100%;
    background-color:#f59d9d7e;
    border: 1px solid red;
    padding:0.1rem 0.4rem;
    margin-top: .2rem;
   }

   input{
    padding: 0.4rem;
    width: 100%;
   }

   input[type="submit"]{
    background-color: #3294f0;
    border: none;
    padding: .4rem;
    color: #fff;
    cursor: pointer;


    &:hover{
      background-color: #13497c;
    }
   }
`