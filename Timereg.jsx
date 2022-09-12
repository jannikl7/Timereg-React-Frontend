import React, { Component } from "react";

class Timereg extends Component {
  constructor(props) {
    super(props);
  }

  liveRegController(cmd) {
    let comnt = document.getElementById("liveRegCmnt").value;
    //handle pause/resume
    if (cmd === "pause") {
      if (document.getElementById("pause").value === "pause") {
        document.getElementById("pause").value = "resume";
        this.props.pause();
      } else {
        document.getElementById("pause").value = "pause";
        this.props.resume();
      }
    } else if (cmd === "start") {
      this.props.start(comnt);
    } else if (cmd === "stop") {
      this.props.stop();
    }
  }

  render() {
    return (
      <div className="newTask">
        <button onClick={() => this.liveRegController("start")}>
          Start work
        </button>
        <button
          type="button"
          id="pause"
          name="pause"
          onClick={() => this.liveRegController("pause")}
        >
          Pause
        </button>
        <button type="button" onClick={() => this.liveRegController("stop")}>
          Save
        </button>
        <br />
        <textarea
          name="liveRegCmnt"
          id="liveRegCmnt"
          className="comment"
        ></textarea>
      </div>
    );
  }
}

export default Timereg;
