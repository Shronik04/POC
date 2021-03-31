
import './App.css';
import SignUp from './components/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Switch,Link, Route} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Admin from './components/Admin';
import UserP from './components/UserP'
import First from './components/First'

function App() {
  
  return (
    <div className="App">
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
   <Link to="/">HOME</Link>
    <div className="navbar-nav ml-auto">
    <Link to="/signup">
    <button>
      Signup
    </button>
    </Link> 
    <Link to="/login">
    <button>
      login
    </button>
    </Link> 
    </div>
  </div>
</nav>
      <Switch>
  <Route exact path="/" component={First} />
        
  <Route exact path="/signup" component={SignUp} />
  <Route exact path="/login" component={Login} />
  <Route exact path="/dashboard" component={Home} />
  
  <Route exact path="/admin" component={Admin} />
  <Route exact path="/user" component={UserP} />



</Switch>
    </div>
  );
}

export default App;
