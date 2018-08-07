import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import isElectron from 'is-electron';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const styles = theme => ({
  root: {
    width: '90%',
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: '#888888',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#000000',
    },
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: '30px',
  },
  resetContainer: {
    paddingBottom: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    backgroundColor: 'transparent',
  },
  labelCustom: {
    color: '#ffffff',
    display: 'inline-block',
  },
  labelContainer: {
    color: 'blue',
  },
  vertical: {
    backgroundColor: 'transparent',
    marginTop: '20px',
  },
  iconContainer: {
    backgroundColor: '#ffffff',
  },
});

const getSteps = () => ['Enter players data', 'Choose question pack', 'Get Ready!'];

const getStepContent = (step, props) => {
  switch (step) {
    case 0:
      return <StepOne {...props} />;
    case 1:
      return <StepTwo reducerName={props.reducerName} />;
    case 2:
      return <StepThree />;
    default:
      return 'Unknown step';
  }
};

class VerticalLinearStepper extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    handleOpenSnackbar: PropTypes.func.isRequired,
    playerNumber: PropTypes.number.isRequired,
    reducerName: PropTypes.string.isRequired,
    handleOpenSnackbarGlobal: PropTypes.func.isRequired,
    playersReducerOOT: PropTypes.shape({
      playerList: PropTypes.array,
    }).isRequired,
    questionsReducerFF: PropTypes.shape({
      playerList: PropTypes.array,
    }).isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props[`stepperReducer${this.props.reducerName}`].activeStep === 3 && nextProps[`stepperReducer${this.props.reducerName}`].activeStep === 0) {
      setTimeout(() => {
        this.clearInputs();
      }, 0);
    }
  }
  handleNext = () => {
    this.props.dispatch({
      type: `STEP_NEXT_${this.props.reducerName}`,
    });
  };

  handleBack = () => (
    this.props.dispatch({
      type: `STEP_BACK_${this.props.reducerName}`,
    })
  );

  handleReset = () => (
    this.props.dispatch({
      type: `STEP_RESET_${this.props.reducerName}`,
    })
  );

  handleStartGame = () => (
    this.props.dispatch({
      type: `STEP_FINISH_${this.props.reducerName}`,
    })
  );

  clearInputs = () => {
    document.querySelectorAll('.playerName').forEach((el) => {
      const element = el;
      element.value = '';
    });
  }

  showValidatePopup = () => {
    this.props.handleOpenSnackbar();
  }

  handleFinish = () => {
    this.handleStartGame();
    this.handleNewWindow();
  }

  handleNewWindow = () => {
    const crateNewWindow = (pathToRoute, prodPath) => {
      if (isElectron()) {
        const { remote } = window.require('electron');
        const { BrowserWindow, app } = remote;
        const win = new BrowserWindow({ width: 800, height: 600 });
        if (window.location.hostname === 'localhost') {
          win.loadURL(`http://localhost:3000${pathToRoute}`);
        } else {
          win.loadURL(`file://${app.getAppPath()}/build/index.html?game=${prodPath}`);
        }
      } else {
        window.open(pathToRoute, '_blank');
      }
    };
    if (this.props.reducerName === 'OOT') {
      crateNewWindow('/one-of-ten/game', this.props.reducerName);
    } else if (this.props.reducerName === 'FF') {
      crateNewWindow('/family-feud/game', this.props.reducerName);
    }
  }

  handleValidateInputs = (activeStep, callback) => {
    const list = this.props.reducerName === 'OOT' ? this.props.playersReducerOOT.playerList : this.props.questionsReducerFF.playerList;
    if (activeStep === 0 && list.length !== this.props.playerNumber) {
      this.showValidatePopup(this.props.reducerName);
    } else if (activeStep === 0 && list.length === this.props.playerNumber) {
      for (let i = 0; i < list.length; i += 1) {
        if ((list[i] === '' || list[i] === undefined || list[i] === null) && i !== list.length - 1) {
          this.showValidatePopup(this.props.reducerName);
          break;
        }
        if (i === list.length - 1) {
          if (list[i] === '' || list[i] === undefined || list[i] === null) {
            this.showValidatePopup(this.props.reducerName);
          } else {
            callback();
          }
        }
      }
    } else {
      callback();
    }
    return false;
  }
  render() {
    const { classes } = this.props;
    const { activeStep } = this.props[`stepperReducer${this.props.reducerName}`]; //eslint-disable-line
    const steps = getSteps();
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} className={classes.vertical} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel className="label--hard" optional={<div className={classes.labelCustom}>{label}</div>} />
              <StepContent>
                {getStepContent(index, this.props)}
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={() => {
                        this.handleValidateInputs(activeStep, this.handleBack);
                      }}
                      className={classes.button}
                    >
                        Back
                    </Button>
                    <Button
                      variant="raised"
                      color="primary"
                      onClick={() => {
                        this.handleValidateInputs(activeStep, this.handleNext);
                        if (activeStep === steps.length - 1) {
                          this.handleFinish();
                        }
                      }}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Start Game' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
            ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <p style={{ marginBottom: '30px' }}>All steps completed - you&quot;re finished you can open dashboard or reset game if you want</p>
            <Button onClick={ev => this.props.handleOpenSnackbarGlobal(ev, this.props.reducerName)} className={classes.button}>
              Reset
            </Button>
            <Button className={classes.button} onClick={this.handleNewWindow}>
              Open game window
            </Button>
            {this.props.reducerName === 'FF' ? (
              <Button component={Link} to="/family-feud/dashboard" className={classes.button}>
                Dashboard
              </Button>
            ) : (
              <Button component={Link} to="/one-of-ten/dashboard" className={classes.button}>
                Dashboard
              </Button>
            )}
          </Paper>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stepperReducerOOT: state.stepperReducerOOT,
  playersReducerOOT: state.playersReducerOOT,
  stepperReducerFF: state.stepperReducerFF,
  questionsReducerFF: state.questionsReducerFF,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(VerticalLinearStepper);
