import React, { Component } from "react";
// import { Settings } from "@material-ui/icons";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { Link } from "react-router-dom";
// //import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
import { AsyncStorage } from "AsyncStorage";

class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // anchorEl:null,
      open: false,
      selectedMenu: "workLog",
    };
    this.anchorRef = React.createRef();
    this.prevOpen = React.createRef(this.state.open);
  }

  componentWillUpdate(prevProps, prevState) {
    if (this.props.path !== prevProps.path) {
      if (prevProps.path.indexOf('/workLog') >= 0 ){
        this.setState({selectedMenu:'workLog'})
      }
      //  else if (prevProps.path.indexOf('/message') >= 0 ) {
      //   this.setState({selectedMenu:'message'})
      // } else if (prevProps.path.indexOf('/board') >= 0 ) {
      //   this.setState({selectedMenu:'board'})
      // } else if (prevProps.path.indexOf('/part') >= 0 ) {
      //   this.setState({selectedMenu:'part'})
      // } else if (prevProps.path.indexOf('/user') >= 0 ) {
      //   this.setState({selectedMenu:'user'})
      // } else if (prevProps.path.indexOf('/settings') >= 0 ) {
      //   this.setState({selectedMenu:'settings'})
      // } else if (prevProps.path.indexOf('/accounts') >= 0 ) {
      //   this.setState({selectedMenu:'accounts'})
      // }
      this.selectionMenu(prevProps.path);
    }
  }

  componentWillMount() {
    var menu = window.location.pathname
    // console.log(menu)
    if (menu.indexOf('/workLog') >= 0 ){
      this.setState({ selectedMenu: "workLog" });
    } 
    
    // else if (menu.indexOf("/message") >= 0) {
    //   this.setState({ selectedMenu: "message" });
    // } else if (menu.indexOf("/board") >= 0) {
    //   this.setState({ selectedMenu: "board" });
    // } else if (menu.indexOf("/part") >= 0) {
    //   this.setState({ selectedMenu: "part" });
    // } else if (menu.indexOf("/user") >= 0) {
    //   this.setState({ selectedMenu: "user" });
    // } else if (menu.indexOf("/settings") >= 0) {
    //   this.setState({ selectedMenu: "settings" });
    // } else if (menu.indexOf("/accounts") >= 0) {
    //   this.setState({ selectedMenu: "accounts" });
    // }
    this.selectionMenu(this.props.path);
  }

  selectionMenu = (path) => {
    if (path.indexOf("/workLog") >= 0) {
      this.setState({ selectedMenu: "workLog" });
    } 
    
    // else if (path.indexOf("/message") >= 0) {
    //   this.setState({ selectedMenu: "message" });
    // } else if (path.indexOf("/board") >= 0) {
    //   this.setState({ selectedMenu: "board" });
    // } else if (path.indexOf("/part") >= 0) {
    //   this.setState({ selectedMenu: "part" });
    // } else if (path.indexOf("/user") >= 0) {
    //   this.setState({ selectedMenu: "user" });
    // } else if (path.indexOf("/settings") >= 0) {
    //   this.setState({ selectedMenu: "settings" });
    // } else if (path.indexOf("/accounts") >= 0) {
    //   this.setState({ selectedMenu: "accounts" });
    // }
    
  };

  onLogout = (e) => {
    AsyncStorage.setItem("token", null);
    AsyncStorage.setItem("userName", null);
  };

  handleToggle = () => {
    this.setState({ open: !this.prevOpen.current });
  };

  handleClose = (event) => {
    this.setState({ open: false });
  };

  onSelectMenu = (e) => {
    this.setState({ selectedMenu: e.currentTarget.id });
  };

  onClick = (e) => {
    e.preventDefault();
  };

  componentDidUpdate() {}

  render() {
    let userName = null;
    AsyncStorage.getItem("userName", (err, result) => {
      userName = result;
    });
    return (
      <header className="main-header">
        <Link to="/workLog" className="logo">
          <span className="logo-lg">
            <b>장수 업무지원 시스템</b>
          </span>
        </Link>

        <nav className="navbar navbar-static-top">
        <div className="top-menu navbar-left">
            <div className={"main-menu " + this.state.selectedMenu} id="workLog" onClick={this.onSelectMenu}>
              <Link to="/workLog" onClick={this.onSelectMenu}>근무일지</Link>
              <div className="sub-menu workLog">
                <Link to="/workLog/weekly"  onClick={this.onSelectMenu}>주간활동일지</Link>
              </div>
            </div>
          </div>

          <div className="top-menu navbar-right">
            <div className={"main-menu " + this.state.selectedMenu} id="accounts" style={{position: "relative"}}>
              <Link to="/"  onClick={this.onClick}>{userName}
                
              </Link>
              <div className="sub-menu accounts" >
                <Link to="/login"  onClick={this.onLogout}>로그아웃</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Head;
