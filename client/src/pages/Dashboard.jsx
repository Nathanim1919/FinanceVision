import { useState } from "react";
import styled from "styled-components";
import { selectUser } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import ExpensePieChart from "../components/graphs/PieChar";
import { Goals } from "../components/dashoardComponents/goals";
import welcomeImage from "/images/coin.png";
import BardGraph from "../components/graphs/barGrapgh";
import Notification from "../components/dashoardComponents/Notification";
import { Transactions } from "../components/dashoardComponents/Transactions";
import FinancialBarChart from "../components/graphs/BarChart";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { formatNumber } from "../utils/Formatting";

// Define the Dashboard component
export const Dashboard = () => {
  const user = useSelector(selectUser);
  const [show, setShow] = useState(false);

  return (
    <Container>
      <div className="welocmepage">
        <div className={"welcometext"}>
          <h3>
            Hi,{" "}
            {user && user.username[0].toUpperCase() + user.username.slice(1)}
          </h3>
          <p>Save, Track, Invest and Grow Exponentially</p>
        </div>
        <div className="amount">
          <h2>{!show ? "*****" : user && formatNumber(user.deposit)} ETB</h2>
          <div onClick={() => setShow(!show)}>
            {show ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
      </div>
      <div className="datas">
        <div className="firstData">
          <div>
            <Goals />
          </div>
          <div>
            <BardGraph />
          </div>
        </div>
        <div>
          <Notification />
        </div>
        <div
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <FinancialBarChart />
        </div>
        <div className="bottomGrid">
          <div>
            <Transactions />
          </div>
          <div
            style={{
              display: "grid",
              placeItems: "center",
            }}
          >
            <ExpensePieChart />
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-rows: 0.1fr 0.9fr;
  overflow: hidden;
  gap: 0.5rem;
  color: #fff;

  @media screen and (max-width: 800px) {
    padding: 0;
  }

  > * {
    flex: 1;
    //animation:fadeUp alternate 1s;

    > * {
      animation: fadeUp alternate 2s;
    }
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  .firstData {
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: hidden;

    > * {
      flex: 1;
      gap: 0.5rem;
    }
  }

  .welocmepage {
    background-color: #fff351;
    background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0.1)
      ),
      url(${welcomeImage});
    background-size: cover;
    background-position: center;
    display: flex;
    width: 100%;
    z-index: 1;
    justify-content: space-between;
    color: #fff;
    padding: 0.5rem;
    box-shadow: 0 17px 33px rgba(0, 0, 0, 0.1);
    gap: 2rem;

    @media screen and (max-width: 800px) {
      padding: 0;
      margin: 0px;
      max-height: 12vh;
    }

    > *:nth-child(2) {
      flex: 1;
      width: 100%;
    }

    > * {
      padding: 0;
      margin: 0;
    }

    div.amount {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 2rem;
      position: relative;
      z-index: 1;
      background-color: rgba(255, 247, 0, 0.59);
      border-radius: 50px;
      padding-right: 1rem;
      backdrop-filter: blur(10px);
      color: #333;

      @media screen and (max-width: 800px) {
        gap: 1rem;
        h2 {
          font-size: 0.8rem;
        }
      }

      > div {
        width: 35px;
        height: 35px;
        background-color: #fffbae;
        color: #333;
        display: grid;
        place-items: center;
        font-size: 1.4rem;
        border-radius: 50%;
        cursor: pointer;
        @media screen and (max-width: 800px) {
          font-size: 1rem;
          width: 30px;
          height: 30px;
        }
      }
    }

    div.welcometext {
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;

      h3 {
        font-size: 2rem;
      }

      * {
        position: relative;
        z-index: 1;
        margin: 0px;
      }

      @media screen and (max-width: 800px) {
        p {
          font-size: 0.7rem;
        }

        h3 {
          font-size: 1rem;
        }
      }

      img {
        width: 100vw;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        object-fit: cover;
        //transform: scale(.8);

        @media screen and (max-width: 800px) {
          transform: scale(0.5);
        }
      }

      div:nth-child(2) {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;

        > * {
          margin: 0;
        }
      }
    }
  }

  .datas {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 100%;
    gap: 0.6rem;

    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(1, 1fr);
      overflow-y: auto;
      width: 100%;
    }

    .bottomGrid {
      display: flex;
      gap: 0.5rem;

      @media screen and (max-width: 800px) {
        flex-direction: column;
      }

      > div {
        flex: 1;
        padding: 0.5rem;
      }
    }

    > * {
      padding: 0.3rem;
      /* background-color: #12123f; */
    }

    div:nth-child(1) {
      grid-row: span 2;
    }

    div:nth-child(4) {
      grid-column: span 2;
      grid-row: span 1;

      @media screen and (max-width: 800px) {
        grid-column: span 1;
      }
    }
  }

  .data2 {
    background-color: red;
    height: 200px;
    width: 100%;
  }
`;
