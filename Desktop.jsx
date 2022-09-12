import React, { Component } from "react";
import History from "./History.jsx";
import Timereg from "./Timereg.jsx";
import PostTimeReg from "./PostTimeReg.jsx";

class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serverDataObj: { history: [], current: {} },
      hostUrl: "http://localhost:13572",
      // hostUrl: "http://localhost:1357",
    };
    this.start = this.startTimereg.bind(this);
    this.fetchData();
  }

  sendAndReceiveData(cmd, callback) {
    fetch(`${this.state.hostUrl}/liveReg/${cmd}/`, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: JSON.stringify(this.state.serverDataObj),
    })
      .then((response) => response.json())
      .then((data) => {
        callback();
      });
  }

  fetchData = () => {
    fetch(`${this.state.hostUrl}/history`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((_data) => {
        let data = JSON.parse(_data);
        this.setState({ serverDataObj: data });
      });
  };

  startTimereg(comnt) {
    if (!this.state.serverDataObj.current)
      this.state.serverDataObj.current = {
        comment: comnt,
      };
    this.sendAndReceiveData("start", this.fetchData);
  }

  pauseTimereg() {
    this.sendAndReceiveData("pause");
  }

  stopTimereg = () => {
    this.sendAndReceiveData("stop", this.fetchData);
  };

  resumeTimereg() {
    this.sendAndReceiveData("resume");
  }

  deleteReg = (guid) => {
    fetch(`${this.state.hostUrl}/delete`, {
      method: "DELETE",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "manual", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        guid: guid,
      }),
    }).then((response) => {
      this.fetchData();
      if (response.status != 200)
        alert(`Unexpected response: ${response.status}`);
    });
  };

  updateReg = (guid, date, hours, comment) => {
    fetch(`${this.state.hostUrl}/update`, {
      method: "PUT",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "manual", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        guid: guid,
        date: date,
        hours: hours,
        comment: comment,
      }),
    }).then((response) => {
      this.fetchData();
      if (response.status != 200)
        alert(`Unexpected response: ${response.status}`);
    });
  };

  savePostTimereg = (date, hours, comment) => {
    fetch(`${this.state.hostUrl}/addRegistration`, {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "manual", // manual, *follow, error
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ date: date, hours: hours, comment: comment }),
    }).then((response) => {
      this.fetchData();
      if (response.status != 200)
        alert(`Unexpected response: ${response.status}`);
    });
  };

  render() {
    return (
      <table className="desktop">
        <tr>
          <td valign="top">
            <div class="header">TimeReg</div>
            <Timereg
              start={this.start}
              pause={this.pauseTimereg}
              resume={this.resumeTimereg}
              stop={this.stopTimereg}
            />
            <br />
            <PostTimeReg save={this.savePostTimereg} />
          </td>
          <td valign="top">
            <div class="header">History</div>
            <History
              data={this.state.serverDataObj}
              updateReg={this.updateReg}
              deleteReg={this.deleteReg}
            />
          </td>
        </tr>
      </table>
    );
  }
}

export default Desktop;
