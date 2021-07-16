import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

  constructor(props) {
      super(props);
      this.onChangename = this.onChangename.bind(this);
      this.onChangedomain = this.onChangedomain.bind(this);
      this.onChangetask = this.onChangetask.bind(this);
      this.onChangedeadline = this.onChangedeadline.bind(this);
      this.onChangemessage = this.onChangemessage.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          name: '',
          domain: '',
          task: '',
          deadline: '',
          message:''
      }
  }

  onChangename(e) {
      this.setState({
          name: e.target.value
      });
  }

  onChangedomain(e) {
      this.setState({
          domain: e.target.value
      });
  }

  onChangetask(e) {
      this.setState({
          task: e.target.value
      });
  }
  onChangedeadline(e) {
    this.setState({
        deadline: e.target.value
    });
}
onChangemessage(e) {
  this.setState({
      message: e.target.value
  });
}

  onSubmit(e) {
      e.preventDefault();
      
      console.log(`Form submitted:`);
      console.log(`name: ${this.state.name}`);
      console.log(`domain: ${this.state.domain}`);
      console.log(`task: ${this.state.task}`);
      console.log(`deadline: ${this.state.deadline}`);
      console.log(`message: ${this.state.message}`);

      const newTodo = {
        name: this.state.name,
        domain: this.state.domain,
        task: this.state.task,
        deadline: this.state.deadline,
        message: this.state.message
    };
    axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));
      
      this.setState({
        name: '',
        domain: '',
        task: '',
        deadline: '',
        message:''
      })
  }

  render() {
      return (
        <div className="contact-form">
        <h4 className="alert">Your Responce Has Been Recorded</h4>
       <form className="form" onSubmit={this.onSubmit}>
           <div className="form-name">
               <input type="text" name="name" id="name" value={this.state.name} onChange={this.onChangename} required />
               <label className="label-name">
                   <span className="content-name">
             <h5>Name</h5>
           </span>
         </label>
       </div>
       <div className="form-name">
         <input type="text" name="domain" id="domain" value={this.state.domain} onChange={this.onChangedomain} required />
         <label className="label-name">
           <span className="content-name">
             <h5>Domain</h5>
           </span>
         </label>
       </div>
       <div className="form-name">
         <input type="text" name="task" id="task" value={this.state.task} onChange={this.onChangetask} required />
         <label className="label-name">
           <span className="content-name">
             <h5>Task Description</h5>
           </span>
         </label>
       </div>
       <div className="form-name">
         <input type="text" name="deadline" id="deadline" value={this.state.deadline} onChange={this.onChangedeadline}  required />
         <label className="label-name">
           <span className="content-name">
             <h5>Deadline</h5>
           </span>
         </label>
       </div>
       <div className="form-name">
         <input type="text" name="message" id="message" value={this.state.message} onChange={this.onChangemessage} required />
         <label className="label-name">
           <span className="content-name">
             <h5>Message</h5>
           </span>
         </label>
       </div>
     <button type="submit" id="submitButton" value="Create Todo">
       <svg
         width="30"
         height="30"
         viewBox="0 0 100 100"
         xmlns="http://www.w3.org/2000/svg"
       >
         <path
           d="M36.6001 75.5V94.8C36.6001 96.1 37.5001 97.3 38.7001 97.8C40.0001 98.2 41.4001 97.8 42.2001 96.7L53.4001 81.3L36.6001 75.5Z"
           fill="#FCC85F"
         />
         <path
           d="M98.1999 2.60001C97.2999 1.90001 95.9999 1.90001 94.9999 2.40001L2.19995 51.4C0.699949 52.2 0.0999486 54.1 0.899949 55.7C1.29995 56.4 1.89995 56.9 2.59995 57.2L28.3999 66L83.2999 18.5L40.7999 70.3L83.9999 85.2C84.2999 85.3 84.6999 85.4 84.9999 85.4C85.5999 85.4 86.0999 85.2 86.5999 84.9C87.3999 84.4 87.8999 83.6 88.0999 82.7L99.4999 5.60001C99.5999 4.50001 99.0999 3.30001 98.1999 2.60001Z"
           fill="#FCC85F"
         />
       </svg>
     </button>
     </form>
   </div>
      )
  }
}

