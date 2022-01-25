// import React, { Component } from "react";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Paper from "@material-ui/core/Paper";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import { Link } from "@material-ui/core";

// class WeeklyLog extends Component {
//   constructor(props) {
//     super(props);
//     this.myRef = React.createRef();
//     this.state = {
//       rows: "",

//       // Paging Settings
//       setCurrentPage: 0,
//       pageSize: 10,
//       pageSizes: [10, 15, 20, 25, 30, 0],

//       completed: 0,
//       selection: [],
//       selectedRow: "",
//       checkedId: "jslee",

//       // confrimTarget: "false",
//       // openProgress: false,
//       // anchorEl: null,
//       // excelElement: "",
//     };
//   }

//   componentDidMount() {
//     this.callApi()
//       .then((res) => {
//         if (res === null) {
//           this.setState({ rows: [] });
//         } else {
//           this.setState({
//             rows: res,
//           });
//           // this.setState({
//           //   excelElement: document.getElementById("execelExport"),
//           // });
//         }
//       })
//       .catch((err) => console.log(err));
//   }

//   callApi = async () => {
//     const response = await fetch("/apis/user/accounts");
//     const body = await response.json();
//     return body;
//   };

//   // onSave = (workbook) => {
//   //   workbook.xlsx.writeBuffer().then((buffer) => {
//   //     saveAs(
//   //       new Blob([buffer], { type: "application/octet-stream" }),
//   //       "여행_여행차수.xlsx"
//   //     );
//   //   });
//   // };

//   // ExportToggleButton = ({ onToggle, getMessage, buttonRef }) => {
//   //   return this.state.excelElement
//   //     ? ReactDOM.createPortal(
//   //         <Tooltip title={getMessage("showExportMenu")}>
//   //           <Button
//   //             className="btn-excel"
//   //             ref={buttonRef}
//   //             onClick={onToggle}
//   //             variant="outlined"
//   //           >
//   //             엑셀다운
//   //           </Button>
//   //         </Tooltip>,
//   //         // document.body.getElementsById("adv")[0]
//   //         document.getElementById("execelExport")
//   //       )
//   //     : null;
//   // };
//   handleChange = (event) => {
//     this.setState({ checkedId: event.target.id });
//   };

//   render() {
//     const label = { inputProps: { "aria-label": "Checkbox demo" } };

//     return [
//       <div className="sub-content-wrapper">
//         {this.state.rows ? (
//           this.state.rows.length > 0 ? (
//             [
//               <section className="content" style={{ position: "relative" }}>
//                 <Paper className="content-paper">
//                   <div className="btn-control">
//                     <Link className="btn-add" to={"/worklog/weekly/detail?userId="+this.state.checkedId}>
//                       주간활동일지 보기
//                     </Link>
//                   </div>
//                   {this.state.rows.map((item) => {
//                     return (
//                       // <FormControlLabel
//                       //   control={<Checkbox defaultChecked />}
//                       //   label={item.lastname + item.firstname}
//                       // />
//                       <FormControlLabel
//                         className="form-control-label"
//                         control={
//                           <Checkbox
//                             id={item.login}
//                             onChange={this.handleChange}
//                             checked={
//                               item.login === this.state.checkedId ? true : false
//                             }
//                           />
//                         }
//                         label={item.lastname + item.firstname}
//                       />
//                     );
//                   })}
//                 </Paper>
//               </section>,
//             ]
//           ) : (
//             <div>No Users</div>
//           )
//         ) : (
//           <CircularProgress
//             style={{ position: "absolute", left: "50%", marginTop: "200px" }}
//           ></CircularProgress>
//         )}
//       </div>,
//     ];
//   }
// }

// export default WeeklyLog;
