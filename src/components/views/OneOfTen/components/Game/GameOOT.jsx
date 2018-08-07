import React, { Component } from 'react';
import shortid from 'shortid';
import Progress from './Progress';
import bgGame from '../../../../../assets/images/bgGame.jpg';
import questionsMap from '../../../../../assets/data/OneOfTen/data';

class GameOOT extends Component {
  constructor() {
    super();
    this.state = {
      localStorageData: JSON.parse(localStorage.getItem('reduxStateOOT')),
      progressComplete: false,
    };
  }

  componentWillMount() {
    this.onMount();
  }

  onMount() {
    window.addEventListener('storage', () => {
      if (this.state.localStorageData.questionsReducerOOT.questionNumber !== JSON.parse(localStorage.getItem('reduxStateOOT')).questionsReducerOOT.questionNumber) {
        this.progress.startTimer();
      }
      this.setState({
        localStorageData: JSON.parse(localStorage.getItem('reduxStateOOT')),
      });
    });
  }

  handleProgressComplete = () => {
    this.setState({
      progressComplete: false,
    });
  }

  handleProgressNotComplete = () => {
    this.setState({
      progressComplete: true,
    });
  }

  render() {
    const { playersReducerOOT, questionsReducerOOT } = this.state.localStorageData;
    const activeQuestionStack = questionsMap[questionsReducerOOT.activeQuestion];
    const questionToShow = activeQuestionStack[questionsReducerOOT.questionNumber];

    const generateChances = (index) => {
      const list = [];
      for (let i = 0; i < 3; i += 1) {
        list.push(<span key={shortid.generate()} className={`chance ${(i < playersReducerOOT.playerChances[index]) ? ('true') : ('')}`} />);
      }
      return list;
    };

    return (
      <div className="game-one-of-ten" style={{ backgroundImage: `url(${bgGame})` }}>
        <div className="game-one-of-ten__status">
          {playersReducerOOT.playerList.map((player, index) => (
            <div
              key={shortid.generate()}
              className={`game-one-of-ten__player ${(playersReducerOOT.playerChances[index] === 0) ? ('off') : ('')} ${questionsReducerOOT.askingPlayer !== index ? ('not-asking') : ('')}`}
            >
              <div className="game-one-of-ten__player__chances">
                {generateChances(index)}
              </div>
              <h4>{player}</h4>
              <h1>{index + 1}</h1>
            </div>
          ))}
        </div>
        <div className="game-one-of-ten__questions">
          <Progress
            ref={(c) => { this.progress = c; }}
            handleProgressComplete={this.handleProgressComplete}
            handleProgressNotComplete={this.handleProgressNotComplete}
            questionNumber={questionsReducerOOT.questionNumber}
            className={this.state.progressComplete ? ('') : ('hide')}
          />
          <h1 className={this.state.progressComplete ? ('') : ('disabled')}>{questionToShow.question}</h1>
        </div>
      </div>
    );
  }
}

export default GameOOT;
