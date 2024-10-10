import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Homepage from './components/Homepage/Homepage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'; // Make sure you include this if it contains global styles like blur effect

function App() {
  return (
    <div className="App">
      <Navbar />
      <Sidebar />
      <div className="main-content">
        <Homepage />
      </div>
    </div>
  );
}

export default App;
