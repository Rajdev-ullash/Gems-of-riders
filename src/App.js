import './App.css';
import Header from './Componenets/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Componenets/Home/Home';
import Login from './Componenets/Login/Login';
import Destination from './Componenets/Destination/Destination';
import { createContext, useState } from 'react';
import PrivateRoute from './Componenets/PrivateRoute/PrivateRoute';
export const UserContext = createContext();


function App() {
  const [loggedIn, setLoggedIn] = useState({});
  const [allVehicle, setAllVehicle] = useState([]);
  return (
    <UserContext.Provider value={{log: [loggedIn, setLoggedIn], vehicles:[allVehicle, setAllVehicle]}}>
      <Router>
        <Header></Header>
        <Switch>

          <Route path="/home">
            <Home></Home>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/destination/:id">
            <Destination />
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
