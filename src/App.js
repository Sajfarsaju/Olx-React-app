import React,{useEffect , useContext} from 'react';
import './App.css';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import Post from './store/PostContext';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import {AuthContext, firebaseContext} from './store/firebaseContext'

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

function App() {

  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(firebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  })
  return (
    <div>
  <Post>

      <Router>
        <Switch>
      <Route exact path='/' >
      <Home />
      </Route>

      <Route path='/signup' >
      <Signup />
      </Route>

      <Route path='/login' >
      <Login />
      </Route>

      <Route path='/create' >
      <Create />
      </Route>

      <Route path='/view' >
      <View />
      </Route>
      </Switch>
      </Router>
  </Post>    
    </div>
  );
}

export default App;
