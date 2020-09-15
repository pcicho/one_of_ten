import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

class Progress extends React.Component {
  constructor() {
    super();
    this.state = {
      completed: 0,
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timer;

  startTimer = () => {
    clearInterval(this.timer);
    this.setState({
      completed: 0,
    }, () => {
      this.props.handleProgressNotComplete();
      this.timer = setInterval(this.progress, 100);
    });
  }

  progress = () => {
    const { completed } = this.state;
    if (this.state.completed !== 100) {
      this.setState({
        completed: completed >= 100 ? 0 : completed + 1,
      });
    } else {
      this.props.handleProgressComplete();
      clearInterval(this.timer);
    }
  };

  render() {
    return (
      <div className={`progress-bar ${this.props.className}`}>
        {this.state.completed !== 100 && (
          <LinearProgress variant="determinate" value={this.state.completed} />
        )}
      </div>
    );
  }
}

export default Progress;
