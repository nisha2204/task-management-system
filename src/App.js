import logo from './logo.svg';
import './Styles/utilities.css';
import Navigation from './Components/Navigation'
import Banner from './Components/Banner'
import Copyright from './Components/Copyright'
import Tasks from './Components/Tasks'
import Form from './Components/Form'
import Edit from './Components/Edit'
import Teams from './Components/Teams'
import TeamForm from './Components/TeamForm'
import TaskInTeam from './Components/TaskInTeam'


import AddMember  from './Components/AddMember';




import SingleMember from './Components/SingleMember'

//import ApolloClient from 'apollo-boost';
//import { ApolloProvider } from 'react-apollo';
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
      <Route path='/edit/:id' component={Edit}/>
      <Route path="/teams" component={Teams}/>
      <Route path="/teamform" component={TeamForm}/>
      <Route path="/taskinteam" component={TaskInTeam} />


      <Route path='/addMember/:id' component={AddMember}/>


      <Route path="/addMember1" component={SingleMember} />

      </Switch>
      <Copyright/>
    </>
    </Router>
    
  );
}

export default App;
