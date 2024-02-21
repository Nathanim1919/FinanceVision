import React from 'react';
import styled from 'styled-components';
import { selectUser } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import ExpensePieChart from '../components/graphs/PieChar';

const Container = styled.div`
   padding:1rem;
   display: grid;
   gap: .5rem;

   .welocmepage{
    background-color: #2c98f7;
    display: flex;
    justify-content: space-around;
    align-items: center;

    div:nth-child(1){
      display: flex;
      flex-direction: column;
      

      >*{
        margin: 0;
      }
    }
   }

   .datas{
     display: grid;
     grid-template-columns: repeat(3, 1fr);
     height: 100%;
     gap: 1rem;
     
     >*{
      padding: .3rem;
      background-color: blue;
     }


     div:nth-child(1){
      grid-row:span 2;
      background-color: red;
      
     }
     div:nth-child(4){
      grid-column:span 2;
      grid-row: span 1;
      background-color: red;
     }
   }

   .data2{
      background-color: red;
      height: 200px;
      width: 100%;
   }
`

export const Dashboard = () => {
  const user = useSelector(selectUser);
  return (
    <Container>
       <div className="welocmepage">
          <div>
             <h1>Welocme Back {user.username}</h1>
             <p>Save, Track, Invest and Grow Exponentially</p>
          </div>

          <div className="amount">
            <h1>******* ETB</h1>
          </div>
       </div>
       <div className="datas">
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque voluptate quo maxime adipisci voluptatibus aliquam ea nihil rerum tempore quas sint quisquam molestias consequatur tenetur, perferendis distinctio quia quam, beatae minima, sapiente sunt hic laudantium! Animi necessitatibus quasi minima. Voluptas ut rerum voluptate perferendis sunt veniam, voluptatibus molestiae sed nostrum tempora? Ex, debitis. Aut, placeat nesciunt? Delectus debitis eveniet eligendi similique natus molestiae laborum reprehenderit accusamus, vel illo recusandae ad ipsum itaque obcaecati rem eius magni mollitia quam cum odio ex asperiores. Quas adipisci architecto reprehenderit laboriosam minima harum tempora temporibus saepe, beatae ipsum. Qui, harum sint. At, necessitatibus nisi.</div>
          <div style={{
            display:"grid",
            placeItems:"center"
          }}>
          <ExpensePieChart />
          </div>
          <div style={{
            display:"grid",
            placeItems:"center"
          }}>
          <ExpensePieChart />
          </div>
          <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, dignissimos atque! Id ipsum temporibus illum eveniet dolor maxime ratione expedita consequuntur, corrupti tempore sequi voluptatum inventore enim voluptates exercitationem rerum deleniti. Facilis repellat sit et, fuga magnam est nemo minima. Magnam laudantium quasi nisi non aspernatur corporis sunt labore ex! Facere fuga reprehenderit accusamus. Molestiae dicta quae temporibus eos, eveniet rem at, placeat omnis nemo accusantium deserunt aspernatur excepturi quisquam quibusdam modi cumque atque! Ea minima atque molestiae soluta minus.</div>
       </div>
    </Container>
  )
}

