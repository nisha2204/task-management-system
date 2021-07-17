import logo from './logo.svg';
import './Styles/utilities.css';
import Navigation from './Components/Navigation'
import Banner from './Components/Banner'
import Copyright from './Components/Copyright'
import Tasks from './Components/Tasks'
import Form from './Components/Form'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
    <>
      <Navigation/>
      <Switch>
      <Route path="/" exact component={Banner} />
      <Route path="/tasks" component={Tasks}/>
      <Route path="/form" component={Form}/>
      </Switch>
      <Copyright/>
    </>
    </Router>
  );
}

export default App;
