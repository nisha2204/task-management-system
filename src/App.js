import './Styles/utilities.css';
import Navigation from './Components/Navigation'
import Banner from './Components/Banner'
import Copyright from './Components/Copyright'
import Tasks from './Components/Tasks'
import Form from './Components/Form'
import Edit from './Components/Edit'
import Teams from './Components/Teams'
import TeamForm from './Components/TeamForm'
import EditTeam from './Components/EditTeam';
import AddMember  from './Components/AddMember';






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
      <Route path='/editTeam/:id' component={EditTeam}/>


      <Route path='/addMember/:id' component={AddMember}/>


      

      </Switch>
      <Copyright/>
    </>
    </Router>
    
  );
}

export default App;
