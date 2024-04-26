import { useEffect } from "react";
import styled from "styled-components";
import { GrLinkNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import { GoGoal } from "react-icons/go";
import {
  fetchGoals,
  selectGoals,
  selectLoading,
} from "../../features/goals/goalSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Loader";
import { CiCalendarDate } from "react-icons/ci";
import { PiTargetThin } from "react-icons/pi";
import { calculateTimeLeft, formatNumber } from "../../utils/Formatting";
import { IoIosAdd } from "react-icons/io";

export const Goals = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const goals = useSelector(selectGoals).slice(0, 3);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchGoals(user._id));
  }, [dispatch, user]);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      <div className="header">
        <h2>
          <GoGoal />
          Goals
        </h2>
        <Link to={"/goals"} className="showAllIcon">
          <GrLinkNext />
        </Link>
      </div>
      <GoalContainer>
        {goals.length === 0 ? (
          <div className="emptyOne">
            <p>No goals created yet.</p>
            <Link to="/goals">
              <IoIosAdd />
              create
            </Link>
          </div>
        ) : (
          goals?.map((goal) => (
            <div key={goal.title}>
              <div className="titles">
                <h4>
                  {goal.title.slice(0, 10)}
                  <span>{goal.category}</span>
                </h4>
                <h4>
                  <PiTargetThin />
                  {formatNumber(goal.target)}
                </h4>
              </div>
              <div className="progress">
                <div className="outter">
                  <div
                    progress={goal.progress}
                    style={{
                      backgroundColor:
                        goal.progress === 100 ? "#41cc87" : "#1b76ff",
                      width: `${goal.progress}%`,
                    }}
                    className="inner"
                  ></div>
                </div>
                <p>
                  <CiCalendarDate />
                  {goal.progress === 100
                    ? "completed"
                    : calculateTimeLeft(goal.startDate, goal.deadline)}
                </p>
              </div>
            </div>
          ))
        )}
      </GoalContainer>
    </Container>
  );
};

const Container = styled.div`
  color: #333;
  width: 100%;

  @media screen and (max-width: 800px) {
    /* padding: 1rem; */
    height: 100%;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;

    .showAllIcon {
      width: 15px;
      height: 15px;
      display: grid;
      place-items: center;
      background-color: #eee;
      padding: 0.3rem;
      border-radius: 50%;
    }

    > * {
      margin: 0;
      padding: 0;
    }

    h2 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
    }
  }
`;

const GoalContainer = styled.div`
  display: grid;
  position: relative;
  gap: 0.5rem;

  .emptyOne {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 4rem 0rem;
    width: 100%;

    a {
      background-color: #eee;
      padding: 0.1rem 0.5rem;
      color: #333;
      border-radius: 20px;
      text-decoration: none;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-weight: 600;
    }
  }

  .titles {
    h4 {
      display: flex;
      align-items: center;
      gap: 0.2rem;

      span {
        font-size: 0.7rem;
        background-color: #eee;
        color: #333;
        padding: 0.1rem 0.5rem;
        border-radius: 20px;
        font-weight: 300;
      }
    }
  }

  > div {
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    color: #333;
  }

  div {
    display: flex;
    padding: 0.3rem;
    flex-direction: column;
    gap: 0.1rem;

    > * {
      margin: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      padding: 0;

      > *:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: row;
        gap: 0.2rem;
        background-color: #eee;
        padding: 0.1rem 0.4rem;
        border-radius: 20px;
        font-size: 0.7rem;
        color: #333;
      }
    }
    h4 {
      font-size: 0.8rem;
    }

    .progress {
      display: grid;
      grid-template-columns: 0.5fr 0.4fr;

      .outter {
        width: 100%;
        height: 6px;
        background-color: #eee;
        border-radius: 5px;
        position: relative;
        overflow: hidden;

        .inner {
          height: 100%;
          position: absolute;
          left: 0;
        }
      }
    }
  }
`;
