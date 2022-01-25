import React, { Component } from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import WeeklyLog from './weeklyLog/WeeklyLog';
import WeeklyLogDetail from './weeklyLog/WeeklyLogDetail';
const workLogWeekly = "근무일지";

class WorkLogMenu extends Component {
  constructor(props){
    super(props)
    this.state={
      active : "active",
      menu : workLogWeekly
    }
  }


  componentWillMount(){
    let menu = "workLogWeekly";
    let name = workLogWeekly;
    let pathName = this.props.location.pathname;

    if(pathName.includes("/workLog/weekly")){
      menu = "workLogWeekly";
      name = workLogWeekly;
    }

    this.setState({
      menu : menu,
      name : name,
    });
  }

  componentWillUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      let menu = "workLogWeekly";
      let name = workLogWeekly;
      let pathName = prevProps.location.pathname;

      if(pathName.includes("/workLog/weekly")){
        menu = "workLogWeekly";
        name = workLogWeekly;
      } 
      
      this.setState({
        menu : menu,
        name : name,
      });
    }
  }

  onClick=(e)=>{
    this.setState({
      menu : e.target.id,
      name : e.target.name
    });
  }

  render() {
    return (
      <div>
        <div className="content-sub-menu">
          <div>
          {this.state.name}
          </div>
          
          <Link className={this.state.menu === "workLogWeekly" ? "active" : ""} id="workLogWeekly" name="근무일지" onClick={this.onClick} to="/workLog/weekly">주간활동일지</Link>
          {/* <Link className={this.state.menu === "travelNth" ? "active" : ""} id="travelNth" name="여행차수" onClick={this.onClick} to="/travel/nth">여행차수</Link> */}
        </div>
        <Switch>
          {/* workLog List */}
          <Route path="/workLog/weekly/detail" 
            render={({match,location}) => <WeeklyLogDetail  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/workLog/weekly" 
            render={({match,location}) => <WeeklyLog  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          
          {/* Travel Nth */}
          {/* <Route path="/travel/nth/add" 
            render={({match,location}) => <TravelNthAdd  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/travel/nth/edit" 
            render={({match,location}) => <TravelNthEdit  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route path="/travel/nth/detail" 
            render={({match,location}) => <TravelNthDetail  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route>
          <Route exact path="/travel/nth" 
            render={({match,location}) => <TravelNth  match={match} location={location} menuData={this.onMenuData}/>} >
          </Route> */}

          <Route exact path="/workLog"
            render={({match,location}) => <Redirect to={{
              pathname : `/workLog/weekly`,
              search :location.search
            }}  />} >
          </Route>
        </Switch>
      </div>
    );
  }
}


export default WorkLogMenu;