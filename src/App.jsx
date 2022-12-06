import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Wheel } from './pages/wheel/wheelPage.jsx';
import { UserProvider } from './context/user';
import { WheelProvider } from './context/wheel.jsx';
import {RequireAuth} from "./components/requireAuth";
import {Welcome} from "./pages/welcome";

function App() {
  return (

      <BrowserRouter>
        <UserProvider>

        <Routes>
          <Route path='/' element={<Welcome />}>
            <Route path='admin' element={
              <h1>Hello Admin</h1>
            } />
            <Route path='spin/:wheelId' element={
              <RequireAuth>
                <WheelProvider >
                  <Wheel />
                </WheelProvider >
              </RequireAuth>
            } />
          </Route>
        </Routes>

        </UserProvider>
      </BrowserRouter>
  )
}

export default App
