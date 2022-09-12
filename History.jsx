import React, { Component } from "react";

class History extends Component {
  constructor(props) {
    super(props);
    this.editContainerRef = React.createRef();
    this.editDateRef = React.createRef();
    this.editTimeRef = React.createRef();
    this.editCommentRef = React.createRef();
  }

  edit(guid, date, hours, comment) {
    this.setState({ editGuid: guid });
    this.editDateRef.current.value = new Date(date).toISOString().split("T")[0];
    this.editTimeRef.current.value = hours;
    this.editCommentRef.current.value = comment;
    this.editCommentRef.current.style = { visibility: "visible" };
  }

  render() {
    if (this.props.data) {
      const jsxArr = [],
        weeksArr = [];
      const { history, current } = this.props.data;

      let currentWeek;
      history.forEach((value) => {
        let date = new Date(value.date);
        if (
          date.getWeek() !== weeksArr[weeksArr.length - 1]?.week ||
          weeksArr.length == 0
        ) {
          weeksArr.push({ week: date.getWeek(), registrations: [] });
          console.log(`pushed week: ${date.getWeek()}`);
        }
        weeksArr[weeksArr.length - 1].registrations.push(value);
      });

      console.log(`data: ${this.props.data}`);
      console.log(`history: ${history}, current: ${current}`);
      let bg = ["lightBLUE", "WHITE"];
      if (current?.startedAt) {
        jsxArr.push(
          <div class="regComp" style={{ backgroundColor: "LIGHTGREEN" }}>
            {new Date(current.startedAt).toLocaleDateString()}
            <br />
            {current.comment}
          </div>
        );
      }
      weeksArr.forEach((weekObj) => {
        jsxArr.push(<div>week: {weekObj.week}</div>);
        weekObj.registrations.forEach((value) => {
          let currBg = bg[bg.unshift(bg.pop()) - 1];
          jsxArr.push(
            <div
              className="regComp"
              style={{ backgroundColor: currBg, margin: 2 }}
              id="{value.guid}"
              name="{value.guid}"
              onClick={() =>
                this.edit(value.guid, value.date, value.hours, value.comment)
              }
            >
              {new Date(value.date).toLocaleDateString()}
              <br />
              {value.hours}
              <br />
              {value.comment}
            </div>
          );
        });
      });

      jsxArr.push(
        <div
          className="editReg"
          ref={this.editContainerRef}
          style={
            this.state?.editGuid
              ? { visibility: "visible" }
              : { visibility: "hidden" }
          }
        >
          <input type="date" ref={this.editDateRef} />
          <br />
          <input type="text" ref={this.editTimeRef} />
          <br />
          <textarea className="comment" ref={this.editCommentRef}></textarea>
          <br />
          <button
            onClick={() => {
              this.props.updateReg(
                this.state.editGuid,
                this.editDateRef.current.value,
                this.editTimeRef.current.value,
                this.editCommentRef.current.value
              );
              this.setState({ editGuid: null });
            }}
          >
            Gem
          </button>
          <button onClick={() => this.setState({ editGuid: null })}>
            Anullér
          </button>
          <button
            onClick={() => {
              this.props.deleteReg(this.state.editGuid);
              this.setState({ editGuid: null });
            }}
          >
            Slet
          </button>
        </div>
      );
      return jsxArr;
    }
  }
}

/**
 * Returns the week number for this date.  dowOffset is the day of week the week
 * "starts" on for your locale - it can be from 0 to 6. If dowOffset is 1 (Monday),
 * the week returned is the ISO 8601 week number.
 * @param int dowOffset
 * @return int
 */
Date.prototype.getWeek = function (dowOffset) {
  /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

  dowOffset = typeof dowOffset == "int" ? dowOffset : 0; //default dowOffset to zero
  var newYear = new Date(this.getFullYear(), 0, 1);
  var day = newYear.getDay() - dowOffset; //the day of week the year begins on
  day = day >= 0 ? day : day + 7;
  var daynum =
    Math.floor(
      (this.getTime() -
        newYear.getTime() -
        (this.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) /
        86400000
    ) + 1;
  var weeknum;
  //if the year starts before the middle of a week
  if (day < 4) {
    weeknum = Math.floor((daynum + day - 1) / 7) + 1;
    if (weeknum > 52) {
      let nYear = new Date(this.getFullYear() + 1, 0, 1);
      let nday = nYear.getDay() - dowOffset;
      nday = nday >= 0 ? nday : nday + 7;
      /*if the next year starts before the middle of
                the week, it is week #1 of that year*/
      weeknum = nday < 4 ? 1 : 53;
    }
  } else {
    weeknum = Math.floor((daynum + day - 1) / 7);
  }
  return weeknum;
};

export default History;
