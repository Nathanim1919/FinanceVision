import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";
import { IoIosArrowDropdown } from "react-icons/io";
import { BiUpArrowCircle } from "react-icons/bi";
import axios from "axios";
import { useSelector } from "react-redux";

function IncomeForm({ setAddIncome }) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState("One time");
  const [openDurationBox, setOpenDurationBox] = useState(false);
  const [error, setError] = useState("");


//   get active user
const user = useSelector(state => state.userAuth.user);

  const handleError = () => {
    if (amount <= 0 && !source) {
      setError("Please fill the above required filleds");
    } else if (amount <= 0 && source) {
      setError("Amount should be greater than zero!");
    } else if (amount > 0 && !source) {
      setError("Please fill the source of income");
    } else {
      setError("");
    }
  };

  const createIncome = async (e) => {
    e.preventDefault();
    handleError();

    try {
      const create =await axios.post("http://localhost:5000/api/income/createIncome", {
        source,
        amount,
        duration,
        user
      });
    } catch (error) {
      console.log(error);
    }
    await setAddIncome(false);
  };

  return (
    <Container className="overlay">
      <div>
        <IoClose onClick={() => setAddIncome(false)} className="closeIcon" />
        <form onSubmit={createIncome}>
          <input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            type="text"
            placeholder="Enter source"
          />
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="Enter Amount"
          />
          <div className="durationInput">
            <input
              value={duration}
              type="text"
              placeholder="When will you get it?"
            />
            {!openDurationBox ? (
              <IoIosArrowDropdown onClick={() => setOpenDurationBox(true)} />
            ) : (
              <BiUpArrowCircle onClick={() => setOpenDurationBox(false)} />
            )}
          </div>
          <span className="error">{error}</span>
          <div
            className="options"
            style={{
              opacity: openDurationBox ? 1 : 0,
              transform: openDurationBox
                ? "translateY(0px)"
                : "translateY(20px)",
              transition: "all .4s ease-in-out",
            }}
          >
            <p
              onClick={(e) => {
                setDuration((e.target.innerText).trim());
                setOpenDurationBox(false);
              }}
            >
              One time
            </p>
            <p
              onClick={(e) => {
                setDuration((e.target.innerText).trim());
                setOpenDurationBox(false);
              }}
            >
              Every Day
            </p>
            <p
              onClick={(e) => {
                setDuration((e.target.innerText).trim());
                setOpenDurationBox(false);
              }}
            >
              Every week
            </p>
            <p
              onClick={(e) => {
                setDuration((e.target.innerText).trim());
                setOpenDurationBox(false);
              }}
            >
              Every month
            </p>
            <p
              onClick={(e) => {
                setDuration((e.target.innerText).trim());
                setOpenDurationBox(false);
              }}
            >
              Every Quarter
            </p>
            <p
              onClick={(e) => {
                setDuration((e.target.innerText).trim());
                setOpenDurationBox(false);
              }}
            >
              Every 6 month
            </p>
            <p
              onClick={(e) => {
                setDuration((e.target.innerText).trim());
                setOpenDurationBox(false);
              }}
            >
              Annually
            </p>
          </div>
          <input type="submit" value={"Add"} />
        </form>
      </div>
    </Container>
  );
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

  > div {
    background-color: #fff;
    position: relative;
    padding: 3rem;
    box-shadow: 0 8px 34px rgba(0, 0, 0, 0.067);
    border-radius: 5px;

    .closeIcon {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      cursor: pointer;

      &:hover {
        color: #ddd;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      span.error {
        font-size: 0.7rem;
        color: #333;
        color: #f74646;
      }

      .durationInput {
        border: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;

        > *:nth-child(2) {
          color: #979393;
          cursor: pointer;

          &:hover {
            color: #333;
          }
        }

        > * {
          border: none;
        }
      }

      .options {
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.161);
        position: absolute;
        bottom: -5rem;
        right: 1rem;
        background-color: #fff;

        > * {
          margin: 0;
          font-size: 0.8rem;
          color: #4b4949;
          padding: 0.2rem 0.5rem;
          cursor: pointer;
          border-bottom: 1px solid #ddd;

          &:hover {
            background-color: #eee;
          }
        }
      }

      input {
        padding: 0.5rem 1rem;
        border: 1px solid #eee;
        outline: none;
      }

      input[type="submit"] {
        background-color: blue;
        color: #fff;
        cursor:pointer;

        &:hover{
          background-color: #6060f6;
        }
      }
    }
  }
`;
