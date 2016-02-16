import React from 'react';

class Component extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
      percents: 0
    }
  }
  componentWillMount() {
    cssx(
      .js-progress {
        width: 100%;
        height: 20px;
        margin-bottom: 1em;
        border-radius: 4px;
        border: solid 2px #999;
        padding: 4px;
        display: none;
      }
      .js-progress::after {
        display: block;
        height: 100%;
        width: 0%;
        content: " ";
        background: #99;
      }
    )
  }
  render() {
    cssx(
      input[type="file"] {
        display: `this.state.inProgress ? 'none' : 'block'`;
      }
      .js-progress {
        display: `this.state.inProgress ? 'block' : 'none'`;
      }
      .js-progress::after {
        width: `this.state.percents`%;
      }
    );
    return (
      <div>
        <input type="file" name="file" />
        <div className="js-progress"></div>
        <button
          onClick={ this._handleUpload.bind(this) }
          disabled={ this.state.inProgress ? 'disabled' : null }
          >
            Upload
        </button>
      </div>
    )
  }
  _handleUpload(e) {
    this.setState({
      inProgress: true
    });
    upload(data => {
      this.setState({
        percents: data.progress
      });
      if (data.progress >= 100) {
        this.setState({
          inProgress: false,
          percents: 0
        });
      }
    });
  }
}

export default Component;

function upload(callback) {
  var tmp = 0, step = 1;
  var interval = setInterval(function () {
    tmp += step;
    callback({ progress: tmp });
    if (tmp >= 100) {
      clearInterval(interval);
    }
  }, 10);
};
