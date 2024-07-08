// App.js
import React, { useState } from 'react';
import Header from './components/Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const exchangeLocations = () => {
    const temp = startLocation;
    setStartLocation(endLocation);
    setEndLocation(temp);
  };

  return (
    <div className="app-background">
    <div className="App">
      
      <Header />
      
      
      <div className="form-container">
        <form className="search-container">
        <div className='btnscr2'> <input 
            type="text" 
            placeholder="From" 
            value={startLocation} 
            onChange={(e) => setStartLocation(e.target.value)} 
          /></div>
          <button type="button" className="exchange-button" onClick={exchangeLocations}>
  <img src="up-down.png" alt="Exchange" className="exchange-icon" />
</button>
<div className='btnscr1'>
          <input 
            type="text" 
            placeholder="To" 
            value={endLocation} 
            onChange={(e) => setEndLocation(e.target.value)} 
          /></div><div className='btnscr1'>
       <DatePicker
  selected={startDate}
  onChange={(date) => setStartDate(date)}
  minDate={new Date()}
  showTimeSelect
  dateFormat="Pp"
  className="datepicker"
/></div>
<div className='btnscr'>
          <button type="submit" className="search-button"><img src="search.svg" alt="Exchange" className="search-icon" />   Search</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default App;
