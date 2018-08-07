import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Add from '@material-ui/icons/Add';
import Question from '@material-ui/icons/QuestionAnswer';
import Cancel from '@material-ui/icons/Cancel';
import Check from '@material-ui/icons/CheckCircle';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import grey from '@material-ui/core/colors/grey';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import trueSoundData from '../../../../../assets/audio/true.wav';
import questionsMap from '../../../../../assets/data/OneOfTen/data';

const trueSound = new Audio(trueSoundData);

const styles = {
  root: {
    color: grey[600],
    '&$checked': {
      color: '#00ec00',
    },
  },
  checked: {},
  raisedPrimary: {
    backgroundColor: '#2f3745',
    '&:hover': {
      backgroundColor: 'rgba(199, 199, 199, 0.25)',
      borderColor: 'rgba(199, 199, 199, 0.25)',
    },
  },
  containedPrimary: {
    backgroundColor: '#2f3745',
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: 'rgba(199, 199, 199, 0.25)',
      borderColor: 'rgba(199, 199, 199, 0.25)',
    },
  },
};


class DashboardInput extends Component {
  static propTypes = {
    classes: PropTypes.shape({
    }).isRequired,
    player: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    checkedCheckboxes: PropTypes.number.isRequired,
    questionsReducerOOT: PropTypes.shape({}).isRequired,
  };

  constructor() {
    super();
    this.state = {
      questionButtonEnabled: true,
      completed: 0,
    };
  }

  componentWillUnmount() {
    clearInterval(this.timerInput);
    clearTimeout(this.timeoutForButton);
    this.setState({
      completed: 0,
      questionButtonEnabled: true,
    });
  }

  handleRemove = index => (
    this.props.dispatch({
      type: 'CHANCE_CHANGE_REMOVE_OOT',
      player: index,
    })
  );

  handleAdd = index => (
    this.props.dispatch({
      type: 'CHANCE_CHANGE_ADD_OOT',
      player: index,
    })
  );

  handleAskQuestion = (index) => {
    this.props.dispatch({
      type: 'ASK_QUESTION_OOT',
      player: index,
    });
    clearInterval(this.timerInput);
    this.setState({
      completed: 0,
    });
    this.disableQuestionButton();
  };

  disableQuestionButton = () => {
    this.setState({
      questionButtonEnabled: false,
    }, () => {
      this.timerInput = setInterval(this.progress, 100);
      this.timeoutForButton = setTimeout(() => {
        this.setState({
          questionButtonEnabled: true,
        });
      }, 5000);
    });
  }

  progress = () => {
    const { completed } = this.state;
    if (this.state.completed !== 100) {
      this.setState({
        completed: completed >= 100 ? 0 : completed + 1,
      });
    }
  };

  timerInput;
  timeoutForButton;

  render() {
    const questions = 3;
    const {
      player, index, classes, checkedCheckboxes, questionsReducerOOT,
    } = this.props;

    const activeQuestionStack = questionsMap[questionsReducerOOT.activeQuestion];
    const answerToShow = activeQuestionStack[questionsReducerOOT.questionNumber];
    const generateCheckboxes = () => {
      const list = [];
      for (let i = 0; i < questions; i += 1) {
        list.push(<Checkbox
          value="checkedF"
          disableRipple
          style={{ width: '30px' }}
          checked={i < checkedCheckboxes}
          key={i}
          classes={{
          root: classes.root,
          checked: classes.checked,
        }}
        />);
      }
      return list;
    };

    return (
      <div className="dashboard-input">
        <h4>{index + 1}. {player}</h4>
        {generateCheckboxes()}
        <Button
          mini
          className={classes.raisedPrimary}
          style={{ marginRight: '30px', marginLeft: '10px' }}
          variant="fab"
          color="primary"
          aria-label="add"
          onClick={() => this.handleAdd(index)}
        >
          <Add />
        </Button>
        <Button
          mini
          className={classes.raisedPrimary}
          variant="fab"
          color="primary"
          disabled={checkedCheckboxes === 0}
          aria-label="ok"
          onClick={() => trueSound.play()}
        >
          <Check />
        </Button>
        <Button
          mini
          className={classes.raisedPrimary}
          variant="fab"
          color="primary"
          disabled={checkedCheckboxes === 0}
          aria-label="remove"
          onClick={() => this.handleRemove(index)}
        >
          <Cancel />
        </Button>
        <Button
          className={classes.containedPrimary}
          onClick={() => this.handleAskQuestion(index)}
          style={{ margin: '0 30px', color: '#fff' }}
          variant="raised"
          color="primary"
          disabled={checkedCheckboxes === 0 || !this.state.questionButtonEnabled}
          aria-label="remove"
        >
        Ask Question
          <Question style={{ marginLeft: '10px' }} />
        </Button>

        {questionsReducerOOT.askingPlayer === index && (
          <CircularProgress
            variant="static"
            className="progress-circle"
            value={this.state.completed}
          />
        )}
        {questionsReducerOOT.askingPlayer === index && (
          <div className="dashboard-input__answers">
            <p><strong>Question: </strong>{answerToShow.question}</p>
            <p><strong>Answer: </strong>{answerToShow.answer}</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playersReducerOOT: state.playersReducerOOT,
  questionsReducerOOT: state.questionsReducerOOT,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(DashboardInput);

