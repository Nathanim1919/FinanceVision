import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Assuming custom Auth context
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

function App() {
  // const navigate = useNavigate()
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            {/* User-facing routes (public) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/verify-email/:unHashedToken' element={<EmailVerified/>}/>

            {/* Protected routes (authenticated) */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transactions/:transactionId" element={<TransactionDetails />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/goals/:goalId" element={<GoalDetails />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Error handling (optional) */}
            <Route path="*" element={<NoMatch />} /> // Handle not-found scenarios
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;




import {useAuth } from './context/AuthContext';

function ProtectedRoutes({ children }) {
  const { isLoggedIn, navigateToLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true })
    }
  }, [isLoggedIn]);

  return <>{children}</>; // Render child components
}

// NoMatch component (optional)
import { Link } from 'react-router-dom';



function NoMatch() {
  return (
      <div>
        <h2>Page not found!</h2>
        <Link to="/">Go back home</Link>
      </div>
  );
}