import React, { Component } from "react";

class PostTimeReg extends Component {
  constructor(props) {
    super(props);
    this.hoursValueRef = React.createRef();
    this.timeRef = React.createRef();
    this.dateRef = React.createRef();
    this.commentRef = React.createRef();
    this.state = {
      timeValue: 0.5,
      date: new Date().toISOString().split("T")[0],
      comment: "",
    };
  }

  componentDidMount() {
    this.hoursValueRef.current.value = this.state.timeValue;
    this.dateRef.current.value = this.state.date;
    this.commentRef.current.value = this.state.comment;
  }

  postRegController() {
    let comnt = document.getElementById("postComment").value;
  }

  render() {
    return (
      <div id="postReg" className="regComp">
        <div>Post-registration</div>
        Total time(hours):
        <br />
        <input
          id="hours"
          ref={this.timeRef}
          type="range"
          min="0.5"
          max="10"
          step="0.5"
          defaultValue="0.5"
          onChange={() => {
            this.setState({ timeValue: this.timeRef.current.value });
            this.hoursValueRef.current.value = this.timeRef.current.value;
          }}
        />
        <output ref={this.hoursValueRef}></output>
        <input
          ref={this.dateRef}
          type="date"
          onChange={() => this.setState({ date: this.dateRef.current.value })}
        />
        <br />
        <br />
        Comment:
        <br />
        <textarea
          className="comment"
          ref={this.commentRef}
          onChange={() =>
            this.setState({ comment: this.commentRef.current.value })
          }
        ></textarea>
        <br />
        <button
          onClick={() =>
            this.props.save(
              this.state.date,
              this.state.timeValue,
              this.state.comment
            )
          }
        >
          Gem
        </button>
      </div>
    );
  }
}

export default PostTimeReg;
