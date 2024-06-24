import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="signUp" element={<SignUp/>}/>
      <Route path="signIn" element={<SignIn/>}/>
      <Route path="Dashboard" element={<Dashboard/>}/>
    </Routes>
</Router>
  )
}

export default App
