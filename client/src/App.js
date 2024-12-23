import Home from './pages/home'
import ProductList from './pages/productlist';
import ProductPage from './pages/productpage';
import Register from './pages/register';
import Login from './pages/login';
import Cart from './pages/cart';
import Success from './pages/success';
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
function App() {
  const user = useSelector((state)=>state.user.currentUser);
  
  return (
     <Router>
    <Switch>
      <Route exact path = "/">
       <Home/>
      </Route>
       <Route path = "/products/:category">
       <ProductList/>
      </Route>

       <Route path = "/product/:id">
       <ProductPage/>
      </Route>

      <Route path = "/cart">
       <Cart/>
      </Route>

      <Route path = "/success">
       <Success/>
      </Route>
  
       <Route path = "/login">
      {user ? <Redirect to ="/"/> :<Login/>} 
      </Route>

       <Route path = "/register">
      {user ? <Redirect to ="/"/> :<Register/>} 
      </Route>
     
      
    </Switch>      
    </Router>
     
  );
}

export default App;
