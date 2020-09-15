import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Add from '@material-ui/icons/Add';
import Clear from '@material-ui/icons/Clear';
import shortid from 'shortid';
import questionsMap from '../../../../../assets/data/FamilyFeud/data';
import Scrollbar from '../../../Shared/Scrollbar';

const styles = {
  raisedPrimary: {
    backgroundColor: '#2f3745',
    '&:hover': {
      backgroundColor: 'rgba(199, 199, 199, 0.25)',
      borderColor: 'rgba(199, 199, 199, 0.25)',
    },
  },
  raisedSecondary: {
    backgroundColor: '#542828',
    '&:hover': {
      backgroundColor: 'rgba(224, 143, 143, 0.48);',
      borderColor: 'rgba(224, 143, 143, 0.48);',
    },
  },
  raisedPlayers: {
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

class DashboardDD extends Component {
  componentWillUnmount() {
    clearTimeout(this.trueSoundTimeout);
  }

  handleChooseEnquiry = index => (
    this.props.dispatch({
      type: 'CHOOSE_ACTIVE_ENQUIRY',
      enquiry: index,
    })
  );

  handleChooseAnswer = (index, score) => (
    this.props.dispatch({
      type: 'CHOSEN_ANSWER',
      answer: index,
      score,
    })
  );

  handleTeamSelect = team => (
    this.props.dispatch({
      type: 'SELECT_TEAM',
      team: team || null,
    })
  );

  handleWrongAnswer = () => (
    this.props.dispatch({
      type: 'WRONG_ANSWER',
    })
  );

  handlePayWinner = () => (
    this.props.dispatch({
      type: 'PAY_WINNER',
    })
  );

  handleMultiplier = myltiply => (
    this.props.dispatch({
      type: 'MYLTIPLY',
      pow: myltiply,
    })
  );

  trueSoundTimeout;
  prevChoosedAnswer = [];

  render() {
    const {
      activeQuestion,
      activeEnquiry,
      choosedAnswer,
      selectedTeam,
      answers,
      multiply,
      playerList,
    } = this.props.questionsReducerFF;

    const { classes } = this.props;

    const generateMultiplierButton = (times) => {
      const buttons = [];
      for (let i = 0; i < times; i += 1) {
        buttons.push(<Button
          key={shortid.generate()}
          mini
          variant="fab"
          color="primary"
          aria-label="choose"
          className={classes.raisedPrimary}
          style={{ marginRight: '5px' }}
          onClick={() => this.handleMultiplier(i + 1)}
        >
          x{i + 1}
        </Button>); //eslint-disable-line
      }
      return buttons;
    };

    const checkPlayersWrong = (player) => {
      if (answers[player] !== undefined || answers[player]) {
        return answers[player].wrong;
      }
      return false;
    };

    return (
      <div className="family-feud-dashboard">
        <div className="who-plays">
          <Button
            mini
            variant="raised"
            color="primary"
            aria-label="choose"
            className={classes.raisedPlayers}
            disabled={activeEnquiry === null}
            style={selectedTeam === playerList[0] ? {
              textShadow: '0px 0px 15px #fff',
            } : null}
            onClick={() => { this.handleTeamSelect(playerList[0]); }}
          >
            Team {playerList[0]} play now
          </Button>
          <Button
            mini
            variant="raised"
            color="primary"
            aria-label="choose"
            className={classes.raisedPlayers}
            disabled={activeEnquiry === null}
            style={selectedTeam === playerList[1] ? {
              textShadow: '0px 0px 15px #fff',
            } : null}
            onClick={() => { this.handleTeamSelect(playerList[1]); }}
          >
            Team {playerList[1]} play now
          </Button>
        </div>
        <div className="questions">
          <Scrollbar autoHeightMin={200}>
            <div style={{ paddingRight: '15px' }}>
              {questionsMap[activeQuestion].map((el, index) => (
                <div key={shortid.generate()} className="questions__enquiry">
                  <p className={activeEnquiry === index ? ('highlight') : ('')}>{el.question}</p>
                  <Button
                    mini
                    variant="raised"
                    color="primary"
                    aria-label="choose"
                    className={classes.raisedPrimary}
                    size="small"
                    disabled={activeEnquiry === index}
                    onClick={() => this.handleChooseEnquiry(index)}
                  >
                    <ArrowBack style={{ fontSize: '18px', marginRight: '10px' }} /> Choose
                  </Button>
                </div>
            ))}
            </div>
          </Scrollbar>
          <div className="questions__container">
            {(activeEnquiry !== null && selectedTeam !== null) && (
              questionsMap[activeQuestion][activeEnquiry].answers.map((el, index) => (
                <div key={shortid.generate()} className="questions__answer">
                  <div className="name">
                    <p>{el.name}</p>
                    <span className="score">{el.score}</span>
                    <Button
                      mini
                      variant="raised"
                      disabled={choosedAnswer.includes(index)}
                      color="primary"
                      size="small"
                      className={classes.raisedPrimary}
                      aria-label="choose"
                      onClick={() => {
                          this.handleChooseAnswer(index, el.score);
                        }}
                    >
                      <Add style={{ fontSize: '18px', marginRight: '10px' }} /> Choose
                    </Button>
                  </div>
                </div>
              ))
            )}
            <div className="questions__payment">
              <div className="set-up-multiplier">
                {generateMultiplierButton(3)}
                <p className="active">Active multiplier: {multiply}</p>
              </div>
              <div className="payWinner">
                <Button
                  mini
                  variant="raised"
                  color="primary"
                  aria-label="choose"
                  className={classes.raisedPrimary}
                  onClick={() => this.handlePayWinner()}
                >
                  Pay to selected team
                </Button>
              </div>
            </div>
          </div>
          <div key={shortid.generate()} className="questions__wrong-answer">
            <Button
              mini
              variant="raised"
              color="primary"
              aria-label="choose"
              className={classes.raisedSecondary}
              disabled={
                checkPlayersWrong(selectedTeam) >= 3
                || (checkPlayersWrong(playerList[0]) >= 3 && checkPlayersWrong(playerList[1]) === 1)
                || (checkPlayersWrong(playerList[1]) >= 3 && checkPlayersWrong(playerList[0]) === 1)
              }
              onClick={() => {
                this.handleWrongAnswer();
              }}
            >
              <Clear style={{ fontSize: '18px', marginRight: '10px' }} /> Wrong
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questionsReducerFF: state.questionsReducerFF,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(DashboardDD);
