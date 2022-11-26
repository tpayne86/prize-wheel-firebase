import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Wheel } from './components/wheelPage';
import { CustomerForm } from './components/customerForm';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomerForm />} />
          <Route path='/spin' element={<Wheel />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
