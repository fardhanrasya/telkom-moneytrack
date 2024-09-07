import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { isAuth, user } = useAuthContext()
  return (
    <div className="App">
      {isAuth && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login"/>}
              {user && <Home />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/"/>}
              {!user && <Login />}
            </Route>
            <Route path="/signup">
              {user && <Redirect to="/"/>}
              {!user && <Signup />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
