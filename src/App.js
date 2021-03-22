import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/OrderReview/Review';
import Inventory from './components/Inventory/Inventory';
import NotMatch from './components/NotMatch/NotMatch';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';

export const UserContext = createContext();


function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h4>Email : {loggedInUser.email}</h4>
      <Header></Header>
      <Router>
        <Switch>
          <Route path='/shop'> <Shop></Shop> </Route>
          <Route path='/review'><Review /></Route>
          <Route path='/inventory'><Inventory /></Route>
          <PrivateRouter path='/shipment'><Shipment /></PrivateRouter>
          <Route path='/login'><Login /></Route>
          <Route exact path='/'><Shop /></Route>
          <Route path='/product/:productKey'><ProductDetail /></Route>
          <Route path='/*'><NotMatch /></Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
