import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import WorkLogMenu from "../contents/workLog/WorkLogMenu";


// 선택 매뉴에 따라 Contents를 변경하면서 보여줘야함
// 각 컨텐츠는 Route를 이용해서 전환되도록 해야한다.
class Contents extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuData:"none"
    }
  }

  componentDidMount(){}

  onMenuData = (data) => {
    this.setState({menuData : data});
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/workLog" 
            render={({match,location}) => <WorkLogMenu  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route exact path="/"
            render={({match,location}) => <Redirect to={{
              pathname : `/workLog`,
            }}  />} >
          </Route>
        </Switch>
      </div>
      
      );
    }
}

export default Contents;
