import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from './Components/SearchBar/Search';
import Compare from './Components/Compare/Compare';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Search/>}/>
            <Route path='/compare' element={<Compare/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
