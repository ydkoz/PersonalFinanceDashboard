//import logo from "./logo.svg"
//import { Counter } from "./features/counter/Counter"
//import HomePage from './HomePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';
import Login from './components/Login';
import Register from './components/Register';
import "./App.css";

function App() {
  const isLoggedIn = useAppSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/*<Route path="/dashboard" element={<Dashboard />} />*/}
          </Routes>
        </header>
      </div>
    </Router>

//default code from template
    /*
    <div className="App">
      <header className="App-header">
        <HomePage />
      </header>
    </div>

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
    */
  );
}

export default App;