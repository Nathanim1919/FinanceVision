import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from '../App'
import Login from '../features/userAuth/Login';
import Register from '../features/userAuth/Register';



const Router = () =>{
    const router = createBrowserRouter([
        {
            path:'/',
            element: <App/>
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/register',
            element:<Register/>
        }
    ]);


    return <RouterProvider router={router}/>;
}


export default Router;