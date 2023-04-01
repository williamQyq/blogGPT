import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProLogin from './component/Login/ProLogin';

function App() {
  return (
    <Router>
      < Routes >
        <Route path='/login' element={<ProLogin />} />
      </Routes >
    </Router>
  );
}

export default App;
