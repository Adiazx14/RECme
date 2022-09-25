import './styles/App.css';
import {BrowserRouter as Router, Routes} from "react-router-dom"
import SignIn from "./pages/SignIn"
import ResetPassword from "./pages/ResetPassword"
import SignUp from "./pages/SignUp"
import { Route } from 'react-router';
import Main from './pages/Main';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import GoogleAuth from './components/GoogleAuth';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoute/>}>
            <Route path='/' element={<Main/>}/>
          </Route>
          <Route path='/sign-in' element={<GoogleAuth/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='/profile' element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
        </Routes>
        
      </Router>
    </>
  );
}

export default App;
