import React, { PureComponent } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Favorite from '@material-ui/icons/Favorite';
import HalfStar from '@material-ui/icons/StarHalf';
import Star from '@material-ui/icons/Star';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import shortid from 'shortid';

// eslint-disable-next-line no-unused-vars
const classes = {
  selected: {
    backgroundColor: '#2E3645!important',
    color: '#ffffff!important',
  },
  root: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    borderRadius: '2px',
  },
  wrapper: {
    color: '#ffffff',
  },
};

const handleLoadData = (active, questions, data) => {
  const newQuestions = [...questions];
  newQuestions[active] = data[active];

  return {
    type: 'LOAD_OOT_QUESTION_DATA',
    questions: newQuestions,
  };
};

const handleRemoveData = (active, questions) => {
  const newQuestions = [...questions];
  newQuestions[active] = [];
  return {
    type: 'REMOVE_OOT_QUESTION_DATA',
    questions: [...newQuestions],
  };
};


class Questions extends PureComponent {
  constructor() {
    super();

    this.state = {
      snackbarOpen: false,
      active: 0,
    };
  }

  componentDidMount() {
    this.initialState();
  }

  initialState = () => {
    const { data } = this.props;
    this.setState(prevState => ({
      ...prevState,
      questions: data,
      active: prevState.active,
    }));
  }

  selectCategory = (event, newValue) => {
    this.setState({
      active: newValue,
    });
  }

  handleSnackbar = open => () => {
    this.setState({
      snackbarOpen: open,
    });
  };

  renderQuestions = () => {
    const { active } = this.state;
    const { questions } = this.props;
    return questions[active].map((field, index) => (
      <div key={`${field.question}_${index}`}>
        <span>{index + 1}.</span>
        <input value={field.question} />
        <input value={field.answer} />
      </div>
    ));
  }

  render() {
    const {
      data, _handleLoadData, _handleRemoveData,
    } = this.props;
    const { questions, active } = this.state;
    return (
      <div>
        <BottomNavigation
          className="question-pack--hard"
          value={this.state.active}
          onChange={this.selectCategory}
          showLabels
        >
          <BottomNavigationAction classes={{ root: 'label--hard', label: 'question-label' }} label="Wedding" icon={<Favorite />} />
          <BottomNavigationAction classes={{ root: 'label--hard', label: 'question-label' }} label="Basic" icon={<HalfStar />} />
          <BottomNavigationAction classes={{ root: 'label--hard', label: 'question-label' }} label="Hard" icon={<Star />} />
        </BottomNavigation>
        <Button onClick={() => _handleLoadData(active, questions, data)}>Load Data</Button>
        <Button onClick={this.handleSnackbar(true)} className={classes.button}>
          Reset
        </Button>
        <Snackbar
          className="snackbar--hard"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={null}
          onClose={this.handleSnackbar(false)}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">If you click the continue button you lose all saved data in selected question pack</span>}
          action={[
            <Button
              key={shortid.generate()}
              style={{ color: '#ffffff' }}
              onClick={() => {
                this.handleSnackbar(false)();
                _handleRemoveData(active, questions);
              }}
            >
              Continue
            </Button>,
            <Button
              key={shortid.generate()}
              style={{ color: '#ffffff' }}
              onClick={this.handleSnackbar(false)}
            >
              Back
            </Button>,
          ]}
        />
        {this.renderQuestions()}
      </div>
    );
  }
}

const matchDispatchToProps = dispatch => bindActionCreators({
  _handleLoadData: handleLoadData,
  _handleRemoveData: handleRemoveData,
}, dispatch);

const mapStateToProps = state => ({
  questions: state.questionsReducerOOT.questions,
});

export default connect(mapStateToProps, matchDispatchToProps)(Questions);
