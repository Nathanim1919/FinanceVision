import { useSelector } from "react-redux";
import styled from "styled-components";
import { formatNumber } from "../../utils/Formatting";

export default function UserFinancePieChart() {
  const incomes = useSelector((state) => state.income.incomes);
  const expenses = useSelector((state) => state.expense.expenses);
  const goals = useSelector((state) => state.goal.goals);
  const incomeLoading = useSelector((state) => state.income.loading);
  const expenseLoading = useSelector((state) => state.expense.loading);

  if (incomeLoading || expenseLoading) {
    return <div>Loading...</div>;
  }

  const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
  const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const netAmount = goals.reduce((acc, goal) => acc + goal.current, 0);

  return (
    <Container>
      <Upper>
        <div>
          <h1>{formatNumber(totalIncome)} <span>ETB</span></h1>
          <p>Total Income</p>
        </div>
        <div>
          <h1>{formatNumber(totalExpense)} <span>ETB</span></h1>
          <p>Total Expense</p>
        </div>
      </Upper>
      <Net>
        <h1>{formatNumber(netAmount)} <span>ETB</span></h1>
        <p>Saved for Goals</p>
      </Net>
    </Container>
  );
}
const Container = styled.div`
width: 100%;
display: grid;
gap: .5rem;

span{
  font-size: .7rem;
  background-color: #84b9ff;
  padding: 0.1rem .5rem;
  color: #fff;
  border-radius: 10px;
  font-weight: 200;
}

p{
  color: #ffffff;
  background-color: #61a361;
  font-size: .8rem;
  padding: 0.2rem .5rem;
  border-radius: 20px;
}

`

const Upper = styled.div`
    display: flex;
    justify-content: space-between;
    color: #333;
    gap: .5rem;

    div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #eee;
        padding: 0.5rem;

        > *{
          margin: 0;
        }
    }
`

const Net = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #eee;
    color: #333;
    align-items: center;
    padding: 0.5rem;

    > *{
      margin: 0;
    }
`