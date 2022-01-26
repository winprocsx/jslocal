import React, { Component } from "react";
import {
  SearchState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  Toolbar,
  SearchPanel,
  TableColumnResizing,
  TableHeaderRow,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { Button, Tooltip } from "@material-ui/core";
import * as util from "../../../util/utils";

class WeeklyLog extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      columns: [
        { name: "login", title: "사용자 ID" },
        { name: "name", title: "이름" },
        { name: "admin", title: "관리자여부" },
        { name: "last_login_on", title: "마지막 로그인 일시" },
        { name: "created_on", title: "생성일" },
        { name: "id", title: "ID" },
      ],
      defaultColumnWidths: [
        { columnName: "login", width: 150 },
        { columnName: "name", width: 150 },
        { columnName: "admin", width: 150 },
        { columnName: "last_login_on", width: 150 },
        { columnName: "created_on", width: 150 },
        { columnName: "id", width: 0 },
      ],
      rows: [],

      // Paging Settings
      setCurrentPage: 0,
      pageSize: 10,
      pageSizes: [10, 15, 20, 25, 30, 0],

      completed: 0,
    };
  }

  componentDidMount() {
    this.callApi()
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
  }

  callApi = async () => {
    const response = await fetch("/apis/workLog/weekly");
    const body = await response.json();
    return body;
  };

  ExportToggleButton = ({ onToggle, getMessage, buttonRef }) => {
    return this.state.excelElement
      ? ReactDOM.createPortal(
          <Tooltip title={getMessage("showExportMenu")}>
            <Button
              className="btn-excel"
              ref={buttonRef}
              onClick={onToggle}
              variant="outlined"
            >
              엑셀다운
            </Button>
          </Tooltip>,
          // document.body.getElementsById("adv")[0]
          document.getElementById("execelExport")
        )
      : null;
  };

  render() {
    //셀
    const Cell = (props) => {
      const { column, row } = props;

      if (column.title.includes("id")) {
        return <Table.Cell {...props} style={{ textAlign: "center" }} />;
      } else if (column.name === "admin") {
        let status = "";
        switch (props.value) {
          case 1:
            status = "관리자";
            break;
          default:
            status = "사용자";
        }
        return (
          <Table.Cell {...props} style={{ textAlign: "center" }}>
            {status}
          </Table.Cell>
        );
      } else if (column.name === "name" || column.name === "login") {
        let now = util.dateFormat(new Date(), "%Y-%m-%d", false);
        let before = util.dateFormat(new Date(util.getDateBefore("d", 30)), "%Y-%m-%d", false);

        return (
          <Table.Cell {...props} style={{ cursor: "pointer" }}>
            <Link
              to={{
                pathname: `/workLog/weekly/detail`,
                search: `id=${row.login}&st=${before}&ed=${now}`,
              }}
            >
              {props.value}
            </Link>
          </Table.Cell>
        );
      }

      return <Table.Cell {...props} />;
    };

    const HeaderRow = ({ row, ...restProps }) => (
      <Table.Row
        {...restProps}
        style={{
          cursor: "pointer",
          backgroundColor: "whitesmoke",
          // ...styles[row.sector.toLowerCase()],
        }}
        // onClick={()=> alert(JSON.stringify(row))}
      />
    );

    const Row = (props) => {
      return <Table.Row {...props} key={props.tableRow.key} />;
    };

    return [
      <div className="sub-content-wrapper">
        {this.state.rows.length > 0 ? (
          [
            <section className="content" style={{ position: "relative" }}>
              <Paper>
                <div
                  style={{
                    position: "absolute",
                    right: "21px",
                    top: "20px",
                    zIndex: "10",
                    textTransform: "capitalize",
                  }}
                ></div>
                <Grid rows={this.state.rows} columns={this.state.columns}>
                  <Toolbar />
                  {/* 검색 */}
                  <SearchState className="search-Satste" defaultValue="" />
                  <SearchPanel
                    className="search-Satste"
                    style={{ marginLeft: 200, backgroundColor: "#000000" }}
                  />

                  {/* Sorting */}
                  <SortingState
                    defaultSorting={[{ columnName: "login", direction: "asc" }]}
                  />

                  {/* 페이징 */}
                  <PagingState
                    defaultCurrentPage={0}
                    defaultPageSize={this.state.pageSize}
                  />
                  <PagingPanel pageSizes={this.state.pageSizes} />

                  <IntegratedFiltering />
                  <IntegratedSorting />
                  <IntegratedPaging />

                  {/* 테이블 */}
                  <Table cellComponent={Cell} rowComponent={Row} />
                  <TableColumnResizing
                    defaultColumnWidths={this.state.defaultColumnWidths}
                  />
                  <TableHeaderRow
                    showSortingControls
                    rowComponent={HeaderRow}
                  />
                </Grid>
              </Paper>
            </section>,
            <section
              className="content"
              style={{ position: "relative" }}
            ></section>,
          ]
        ) : (
          <CircularProgress
            style={{ position: "absolute", left: "50%", marginTop: "200px" }}
          ></CircularProgress>
        )}
      </div>,
    ];
  }
}

export default WeeklyLog;
