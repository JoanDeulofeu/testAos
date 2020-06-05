//Dependencies react
import React, { Component, Fragment } from 'react';
import './App.css';

//JSX React
class App extends Component {
   constructor(props) {
      super(props);
      this.state = { apiResponse: "" };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }
  
   callAPI() {
      fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }));
   }
  
   componentWillMount() {
      this.callAPI();
   }

   handleChange(event) {
      this.setState({value: event.target.value});
   }
  
   handleSubmit(event) {
      alert('Votre login est : ' + this.state.value);
      event.preventDefault();
   }

	render () {
		return (
      <Fragment>
         <h1>{this.props.titre}</h1>
         <form onSubmit={this.handleSubmit}>
         <label>
         Login :
         <input type="text" value={this.state.value} onChange={this.handleChange} />
         </label>
         <br/><br/>
         <label>
         Password : 
         <input type="text"/>
         </label>
         <br/><br/>
         <input type="submit" value="Submit" />
      </form>
      <br/><br/><br/><br/>
      <p className="App-intro">Etat de l'API : {this.state.apiResponse}</p>
      </Fragment>
		);
  }
}

export default App;

/*                       *-*ancien formulaire*-*
<form method="post">
         <label htmlFor="login">Login: </label>
         <input type="text" id="login" name="login"></input><br/><br/>
         <label htmlFor="pwd">Password: </label>
         <input type="text" id="pwd" name="pwd"></input><br/><br/>
         <input type="submit" value="Submit"></input>
</form>
*/
