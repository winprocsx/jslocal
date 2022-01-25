import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { AsyncStorage } from 'AsyncStorage';

// AsyncStorage 사용방법
// var username = "test"
// AsyncStorage.setItem("userName", username)
// var userId = ""
// AsyncStorage.getItem("userName",(err, result) => { userId = result})

// localStorage 사용방법
// localStorage.setItem("token", "lkwejflkawef");
// localStorage.getItem("token")


class Login extends Component {
  constructor(props) {
    super(props);
    let token = null;
    AsyncStorage.getItem("token",(err, result) => { 
      token = result;
    })

    let loggedIn = false;
    if (token === null || token === "null" || token === "" || token=== undefined) {
      loggedIn = false;
    }

    this.state = {
      username: "",
      password: "",
      loggedIn,
    };
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillMount(){
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    const { username, password } = this.state;
      const url = `/apis/login`;
      const data = {
        userId:username,
        password:password,
      };
      axios.post(url, data)
      .then((res) => {
        if(res.status !== 200){
          alert(res.data.message);
        } else {
          if(res.data.length > 0 ){
            AsyncStorage.setItem("token", "asdlfkasjldkfjlkwejflkawef");
            AsyncStorage.setItem("userName", username);
              this.setState({
              loggedIn: true,
            });
          } else {
            alert(res.data);
          }
        }
      })
      .catch((err) => {
          alert(err);
      });
  }
  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div className="login">
        <div className="login-form">
          <h1> ADMIN</h1>
          <form onSubmit={this.submitForm} style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="아이디"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
            />
            <input
              type="password"
              placeholder="비밀번호"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            <input className="btn-signIn" type="submit" value="로그인" />
          </form>
        </div>
      </div>
    );
  }
}
export default Login;

