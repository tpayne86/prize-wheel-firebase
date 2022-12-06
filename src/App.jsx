import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/signIn.jsx'
import { Wheel } from './components/wheelPage';
import { UserProvider } from './context/user';
import { WheelProvider } from './context/wheel.jsx';

function App() {
  return (

      <BrowserRouter>
        <UserProvider>

        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/spin/:wheelId' element={<WheelProvider ><Wheel /></WheelProvider >} />
        </Routes>

        </UserProvider>
      </BrowserRouter>
  )
}

export default App
