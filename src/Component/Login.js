import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../Component/Login.css';




class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

      redirectToReferrer: false,
      password: "",
      username: '',
    };
    this.login = this.login.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.Login = this.Login.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  Login = () => {
    const { name, password } = this.state;
    if (name === 'mandee' && password === '123456') {
      return <Redirect to="/Home/" />
    } else {
      alert("user not found")
    }
  }


  login(key, data) {
    debugger
    key.preventDefault();
    const postData = {
      username: this.state.username,
      password: this.state.password
    };
 

    if (postData.username === 'mandee' && postData.password === '12345') {
      this.setState({ redirectToReferrer: true });
    } else {

      alert("data not found")
    }
  } 
 
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange(e) {
    localStorage.setItem('myValueInLocalStorage', e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/home'} />)
    } else if (this.state.redirectToUser) {
      return (<Redirect to={'/MainPage'} />)
    }
    return (
      <div className="login">
        <h1>Continue Your Journey</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" value={this.state.username} placeholder="Enter Your UserName" onChange={this.handleChange} /><br />
          <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} /><br /><br />
          <input type="submit" onClick={this.login} class="submit" name="commit" />
        </form>
      </div>
    )
  }
}

export default Login;