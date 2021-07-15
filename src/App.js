import logo from './logo.svg';
import { useState } from 'react'
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import Navigation from './Components/Navigation'
import Banner from './Components/Banner'
import Todolist from './Components/Todolist';
import Form from './Components/Form';
import './App.css';
// import './FormStyle.css'

function App() {
  const [ tasks, setTasks] = useState([
    {
        id:1,
        name:'Regina Filange',
        message:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque fuga maxime provident architecto voluptatibus officiis consequuntur repellendus laborum dolorum facere?'
    },
    {
        id:2,
        name:'Ross Geller',
        message:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque fuga maxime provident architecto voluptatibus officiis consequuntur repellendus laborum dolorum facere?'
    },
    {
        id:3,
        name:'Rachel Green',
        message:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque fuga maxime provident architecto voluptatibus officiis consequuntur repellendus laborum dolorum facere?'
    }   
])
  return (
    <Router>
    <>
      <Navigation />
        <Banner />
        <Todolist tasks={tasks}/>
      <Switch>
      <Route path="/form" component={Form}></Route>
      {/* <Form /> */}
      </Switch>
    </>
    </Router>
  );
}



export default App;
