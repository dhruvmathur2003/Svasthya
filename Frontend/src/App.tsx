import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="signUp" element={<SignUp/>}/>
      <Route path="signIn" element={<SignIn/>}/>
    </Routes>
</Router>
  )
}

export default App
