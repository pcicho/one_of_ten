import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Favorite from '@material-ui/icons/Favorite';
import HalfStar from '@material-ui/icons/StarHalf';
import Star from '@material-ui/icons/Star';

const styles = {
  selected: {
    backgroundColor: '#2E3645!important',
    color: '#ffffff!important',
  },
  root: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    borderRadius: '2px',
  },
};

const handleChange = (ev, value, reducerName) => ({
  type: `CHOOSE_ACTIVE_${reducerName}`,
  questions: value,
});

const StepTwo = props => (
  <div style={{ marginTop: '30px' }}>
    <BottomNavigation
      className="question-pack--hard"
      value={props[`questionsReducer${props.reducerName}`].activeQuestion}
      onChange={(ev, value) => props.handleChange(ev, value, props.reducerName)}
      showLabels
    >
      <BottomNavigationAction label="Wedding" classes={{ root: 'label--hard', label: 'question-label' }} icon={<Favorite />} />
      <BottomNavigationAction label="Basic" classes={{ root: 'label--hard', label: 'question-label' }} icon={<HalfStar />} />
      <BottomNavigationAction label="Hard" classes={{ root: 'label--hard', label: 'question-label' }} icon={<Star />} />
    </BottomNavigation>
  </div>
);

const mapStateToProps = state => ({
  questionsReducerOOT: state.questionsReducerOOT,
  questionsReducerFF: state.questionsReducerFF,
});

const matchDispatchToProps = dispatch => bindActionCreators({
  handleChange,
}, dispatch);

export default compose(
  withStyles(styles),
  connect(mapStateToProps, matchDispatchToProps),
)(StepTwo);
