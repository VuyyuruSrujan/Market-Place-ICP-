import { useState } from 'react';
import { Cars_backend } from 'declarations/Cars_backend';
import Another1 from './Another1';
// import WalletButton from './WalletButton';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './Profile';
import Lambhorghini from './Lamborghini';
import Mercede from './Mercede';
import Audi from './Audi';
import Payment from './Payment';

function App() {
    
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Another1 />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Lamborghini" element={<Lambhorghini />} />
        <Route path="/Mercede" element={<Mercede />} />
        <Route path="/Audi" element={<Audi />} />
        <Route path="/Payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
