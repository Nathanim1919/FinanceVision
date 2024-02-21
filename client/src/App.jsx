import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext'; // Assuming custom Auth context
import { ProtectedRoutes } from './layouts/ProtectedRoutes.jsx';

// Import components from respective folders
import {Home} from './pages/Home.jsx'
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import {Goals} from './pages/Goals/Goals.jsx';
import {GoalDetails} from './pages/Goals/GoalDetails.jsx';
import {Settings} from './pages/Settings.jsx';
import {TransactionDetails} from "./pages/Transactions/TransactionDetails.jsx";
import {Transactions} from "./pages/Transactions/Transactions.jsx";
import {Dashboard} from "./pages/Dashboard.jsx";
import { EmailVerified } from './components/modals/emailVarified.jsx';
import Layout from './layouts/MainLayout.jsx';
import PageNotFound  from './pages/PageNotFound.jsx';

function App() {
  // const navigate = useNavigate()
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
          
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/verify-email/:unHashedToken' element={<EmailVerified/>}/>
            {/* for just checking */}
            {/* <Route element={<Layout />}>
              <Route path="/transactions" element={<Transactions />} />
            </Route> */}
            <Route element={<ProtectedRoutes />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/transactions/:transactionId" element={<TransactionDetails />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/goals/:goalId" element={<GoalDetails />} />
                <Route path="/settings" element={<Settings />} />
                </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
  );
}
export default App;