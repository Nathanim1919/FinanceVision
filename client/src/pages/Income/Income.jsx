import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import styled from "styled-components";
import { CiCalendarDate, CiEdit, CiViewTimeline } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";
import IncomeForm from "../../components/forms/IncomeForm";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { Loader } from "../../components/Loader";
import { BsThreeDots } from "react-icons/bs";
import { formatDate } from "../../utils/Formatting";

// import from incomeSlice
import { selectIncomes } from "../../features/incomes/incomeSlice";
import {
  fetchIncomes,
  deleteIncomeAsync,
} from "../../features/incomes/incomeSlice";

const Container = styled.div`
  color: #333;
  margin: 0 auto;
  height: 85vh;
  overflow-y: auto;

  @media screen and (max-width: 800px) {
    height: 100vh;
  }
`;
const Content = styled.div`
  width: 60%;
  margin: 0 auto;
  @media screen and (max-width: 800px) {
    width: 95%;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  .icons {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    > div {
      background-color: #cecbcb;
      width: 20px;
      height: 20px;
      padding: 0.4rem;
      border-radius: 50%;
      color: blue;
      cursor: pointer;
      display: grid;
      place-items: center;
    }
  }
`;
const IncomeBox = styled.div`
  display: grid;
  gap: 0.5rem;

  div.emptyListBox {
    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
      margin: 0;
      font-size: 0.8rem;
    }

    button {
      background-color: blue;
      color: #fff;
      padding: 0.3rem 0.7rem;
      border-radius: 20px;
      cursor: pointer;
      box-shadow: 0 5px 23px #54535347;
      margin-top: 1rem;
      border: none;

      &:hover {
        background-color: #1e90ff;
      }
    }
  }
  > div {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 0.5rem;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;

    &:hover {
      opacity: 0.5;
      > div.icons {
        > div {
          opacity: 1;
        }
      }
    }

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

    > div {
      display: flex;
      flex-direction: column;

      > * {
        margin: 0;
      }

      h3 {
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;
      }
      p {
        font-size: 0.7rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;
      }
    }

    > div.icons {
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: 0.5rem;

      > div {
        background-color: #cecbcb;
        width: 20px;
        height: 20px;
        padding: 0.2rem;
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
`;
function Income() {
  const [createIncome, setCreateIncome] = useState(false);
  const user = useSelector(selectUser);
  const incomes = useSelector(selectIncomes);
  const isLoading = useSelector((state) => state.income.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && incomes.length === 0) {
      dispatch(fetchIncomes(user._id));
    }
  }, [dispatch, incomes.length, user]);

  const handleDelete = (id) => {
    dispatch(deleteIncomeAsync(id, user._id));
    dispatch(fetchIncomes(user._id));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Container>
      {createIncome && <IncomeForm setCreateIncome={setCreateIncome} />}
      <Content>
        <Header>
          <h2>{user.username}'s Incomes</h2>
          <div className="icons">
            <div className="icon" onClick={() => setCreateIncome(true)}>
              <IoMdAdd />
            </div>
            {/* <div>
                        <BsThreeDots/>
                    </div> */}
          </div>
        </Header>
        <IncomeBox>
          {incomes.length === 0 ? (
            <div className="emptyListBox">
              <p>Your income list is currently empty.</p>
              <p>
                Boost your financial tracking by adding a new income source.
              </p>
              <button onClick={() => setCreateIncome(true)}>
                Create Income
              </button>
            </div>
          ) : (
            incomes &&
            incomes
              .slice()
              .reverse()
              .map((income) => (
                <div key={income.id}>
                  <div>
                    <h3>
                      <TbCategoryFilled />
                      {income.category}
                    </h3>
                    <p>
                      <CiCalendarDate />
                      {formatDate(income.date)}
                    </p>
                  </div>
                  <div>
                    <h3>
                      <FaMoneyBillWave />
                      {income.amount} <span>BIRR</span>
                    </h3>
                    <p>
                      <CiViewTimeline />
                      {income.frequency}
                    </p>
                  </div>
                  <div className="icons">
                    <div className="edit">
                      <CiEdit />
                    </div>
                    <div
                      className="delete"
                      onClick={() => handleDelete(income._id)}
                    >
                      <MdDeleteOutline />
                    </div>
                  </div>
                </div>
              ))
          )}
        </IncomeBox>
      </Content>
    </Container>
  );
}

export default Income;
