import React, { Component, createRef } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
// import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { convertUTCTime } from "../../../util/utils";
import ReactToPrint from "react-to-print";

class WeeklyLogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: "",
      completed: 0,
      windowHeight: undefined,
      windowWidth: undefined,
      desc: "",
      startDate: queryString.parse(this.props.location.search).st,
      endDate: queryString.parse(this.props.location.search).ed,
    };
  }

  componentWillMount() {}

  componentDidMount() {
    this.callApi(this.props.location.search)
      .then((res) => {
        // Object.entries(res).forEach(([key, value]) => {
        //   console.log(key, value); // key ,value
        // });

        if (res === null) {
          this.setState({ rows: [] });
        } else {
          this.setState({
            rows: res,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  callApi = async (query) => {
    const response = await fetch(`/apis/workLog/weekly/detail${query}`);
    const body = await response.json();
    return body;
  };

  onCancel = () => {
    window.history.back();
  };

  onSearch = () => {
    let startDate = "";
    let endDate = "";

    if (this.state.startDate.length < 1 || this.state.endDate.length < 1) {
      alert("모든 항목을 작성해주세요");
      return;
    } else {
      startDate = convertUTCTime(
        new Date(this.state.startDate),
        "%Y-%m-%d",
        false
      );
      endDate = convertUTCTime(new Date(this.state.endDate), "%Y-%m-%d", false);
    }

    if (startDate > endDate) {
      alert("검색시작일은 종료일보다 나중일이 될 수 없습니다.");
      return;
    }

    let query = `?id=xxxlix&st=${startDate}&ed=${endDate} 11:59:59`;
    this.callApi(query)
      .then((res) => {
        if (res === null) {
          this.setState({ rows: [] });
        } else {
          this.setState({
            rows: res,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value, // <- 변경 후
    });
  };

  render() {
    return (
      <div className="content-detail" ref={(el) => (this.componentRef = el)}>
        <div className="wrap">
          <div className="btn-control">
            <div onClick={this.onCancel} className="btn-cancel">
              이전
            </div>
            <ReactToPrint
              trigger={() => {
                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                // to the root node of the returned component as it will be overwritten.
                return <a href="#">PDF다운</a>;
              }}
              content={() => this.componentRef}
            />
          </div>
          {this.state.rows ? (
            [
              <div>
                <div className="title">
                  {this.state.rows[0].name} 주간활동일지
                </div>
                <div className="detail-body">
                  <div className="dt-info">
                    {/* {this.stringToHTML('<h1>Hello world!</h1><p>How are you today?</p>')} */}
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <ul className="dt-ul">
                              <li className="dt-li dt-li-100 search">
                                <div className="dt-info-title search">
                                  {" "}
                                  검색일시
                                </div>
                                <div className="dt-info-val search">
                                  <div>
                                    <input
                                      type="date"
                                      name="startDate"
                                      value={this.state.startDate}
                                      onChange={this.handleChange}
                                    ></input>
                                    <span> ~ </span>
                                    <input
                                      type="date"
                                      name="endDate"
                                      value={this.state.endDate}
                                      onChange={this.handleChange}
                                    ></input>
                                  </div>
                                  <div
                                    className="btn-search"
                                    onClick={this.onSearch}
                                  >
                                    검색
                                  </div>
                                </div>
                              </li>
                              {Object.entries(this.state.rows[0].result[0]).map(
                                ([key, value]) => {
                                  return [
                                    <li className="dt-li dt-li-100">
                                      <div className="dt-info-title subject">
                                        {" "}
                                        제목
                                      </div>
                                      <div className="dt-info-val subject">
                                        {value[0].subject}
                                      </div>
                                    </li>,
                                    value.map((item) => {
                                      return (
                                        <li className="dt-li dt-li-100">
                                          <div className="dt-info-title context">
                                            {item.created_on}
                                          </div>
                                          <div
                                            className="dt-info-val context"
                                            dangerouslySetInnerHTML={{
                                              __html: item.notes,
                                            }}
                                          ></div>
                                        </li>
                                      );
                                    }),
                                  ];
                                }
                              )}
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>,
            ]
          ) : (
            <CircularProgress
              style={{ position: "absolute", left: "50%", marginTop: "200px" }}
            ></CircularProgress>
          )}
        </div>
      </div>
    );
  }

  // render() {
  //   return (
  //     <div>
  //     <ReactToPrint
  //       trigger={() => {
  //         // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
  //         // to the root node of the returned component as it will be overwritten.
  //         return <a href="#">Print this out!</a>;
  //       }}
  //       content={() => this.componentRef}
  //     />
  //     <ComponentToPrint ref={el => (this.componentRef = el)} />
  //   </div>
  //   )
  // }
}

class ComponentToPrint extends Component {
  render() {
    return <div>TEST</div>;
  }
}

export default WeeklyLogDetail;
