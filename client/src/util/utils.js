export function dateFormat(date, fstr, utc) {
  utc = utc ? "getUTC" : "get";
  return fstr.replace(/%[Ymd]/g, function (m) {
    switch (m) {
      case "%Y":
        return date[utc + "FullYear"](); // no leading zeros required
      case "%m":
        m = 1 + date[utc + "Month"]();
        break;
      case "%d":
        m = date[utc + "Date"]();
        break;
      default:
        return m.slice(1); // unknown code, remove %
    }
    // add leading zero if required
    return ("0" + m).slice(-2);
  });
}

export function dateTimeFormat(date, fstr, utc) {
  utc = utc ? "getUTC" : "get";
  return fstr.replace(/%[YmdHMS]/g, function (m) {
    switch (m) {
      case "%Y":
        return date[utc + "FullYear"](); // no leading zeros required
      case "%m":
        m = 1 + date[utc + "Month"]();
        break;
      case "%d":
        m = date[utc + "Date"]();
        break;
      case "%H":
        m = date[utc + "Hours"]();
        break;
      case "%M":
        m = date[utc + "Minutes"]();
        break;
      case "%S":
        m = date[utc + "Seconds"]();
        break;
      default:
        return m.slice(1); // unknown code, remove %
    }
    // add leading zero if required
    return ("0" + m).slice(-2);
  });
}

export function getDateBefore(type, time) {
  var d = new Date();
  d = new Date(d.getTime());
  if (type === "h") {
    d.setHours(d.getHours() - time);
  } else if (type === "m") {
    d.setMinutes(d.getMinutes() - time);
  } else if (type === "d") {
    d.setDate(d.getDate() - time);
  }

  var date_format_str =
    d.getFullYear().toString() +
    "-" +
    ((d.getMonth() + 1).toString().length === 2
      ? (d.getMonth() + 1).toString()
      : "0" + (d.getMonth() + 1).toString()) +
    "-" +
    (d.getDate().toString().length === 2
      ? d.getDate().toString()
      : "0" + d.getDate().toString()) +
    " " +
    (d.getHours().toString().length === 2
      ? d.getHours().toString()
      : "0" + d.getHours().toString()) +
    ":" +
    // ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2
    //   ? (parseInt(d.getMinutes() / 5) * 5).toString()
    //   : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) +
    // ":00";
    (d.getMinutes().toString().length === 2
      ? d.getMinutes().toString()
      : "0" + d.getMinutes().toString()) +
    ":" +
    (d.getSeconds().toString().length === 2
      ? d.getSeconds().toString()
      : "0" + d.getSeconds().toString());
  return date_format_str;
}

export function convertUTCTime(date, fstr, utc) {
  utc = utc ? "getUTC" : "get";
  return fstr.replace(/%[YmdHMS]/g, function (m) {
    switch (m) {
      case "%Y":
        return date[utc + "FullYear"](); // no leading zeros required
      case "%m":
        m = 1 + date[utc + "Month"]();
        break;
      case "%d":
        m = date[utc + "Date"]();
        break;
      case "%H":
        m = date[utc + "Hours"]();
        break;
      case "%M":
        m = date[utc + "Minutes"]();
        break;
      case "%S":
        m = date[utc + "Seconds"]();
        break;
      default:
        return m.slice(1); // unknown code, remove %
    }
    // add leading zero if required
    return ("0" + m).slice(-2);
  });
}

export function convertTravelStatus(trvStatus) {
  let status = "";
  switch (trvStatus) {
    case "APPROVAL":
      status = "승인요청";
      break;
    case "CONFIRMED":
      status = "승인완료";
      break;
    case "FIN":
      status = "여행종료";
      break;
    case "REJECT":
      status = "여행취소";
      break;
    case "TRAVEL":
      status = "여행중";
      break;
    case "RECRUIT":
      status = "모집중";
      break;
    default:
      status = "";
  }
  return status;
}

export function trvStatusSelectBoxOptions() {
  let statusOption = [
    { value: "RECRUIT", name: "모집중" },
    { value: "APPROVAL", name: "승인요청" },
    { value: "CONFIRMED", name: "승인완료" },
    { value: "TRAVEL", name: "여행중" },
    { value: "FIN", name: "여행종료" },
    { value: "REJECT", name: "여행취소" },
  ];

  return statusOption;
}


export function fnThousandComma(number){
  if(number !== "" && number !== null && number !== undefined){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }  else {
    return number;
  }
}