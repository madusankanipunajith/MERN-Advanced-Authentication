import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// routing
import PrivateRoute from './components/routing/PrivateRoute';

// screens
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import PrivateScreen from './components/screens/ResetPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';

function App() {
  return (
    <Router>
        <div className="App">
          <Switch>
              <PrivateRoute exact path = "/" component={PrivateScreen}/>
              <Route exact path = "/login" component={LoginScreen}/>
              <Route exact path = "/register" component={RegisterScreen}/>
              <Route exact path = "/forgotpassword" component={ForgotPasswordScreen}/>
              <Route exact path = "/passwordreset/:resetToken" component={ResetPasswordScreen}/>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
