import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { AsyncStorage } from "AsyncStorage";
import Head from "./layout/Head";
import Contents from "./layout/Contents";

class Main extends Component {
  constructor(props) {
    super(props);
    let token = null;
    AsyncStorage.getItem("token", (err, result) => {
      token = result;
    });

    // AsyncStorage.setItem("token", "");

    let loggedIn = true;
    if (token === null || token === "null" || token === "" || token=== undefined) {
      loggedIn = false;
    }

    this.state = {
      isLeftMenuOn: false,
      isLogined: true,
      loggedIn,
      windowHeight: undefined,
      windowWidth: undefined,
    };
  }

  handleResize = () =>
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    });

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  onEditorChange = (value) => {
    this.setState({ desc: value });
  };

  render() {
    
    if (!this.state.loggedIn) {
      return <Redirect to="/login"></Redirect>;
    }

    return (
      <div className="wrapper" style={{ minHeight: this.state.windowHeight }}>
        <Head onSelectMenu={this.onLeftMenu} path={this.props.location.pathname}/>
        <div className="content-area">
          <Contents path={this.props.location.pathname} onSelectMenu={this.onLeftMenu} info={this.props}/>
        </div>
      </div>
    );
  }
}

export default Main;
