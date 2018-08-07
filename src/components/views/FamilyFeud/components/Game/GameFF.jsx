import React, { Component } from 'react';
import shortid from 'shortid';
import questionsMap from '../../../../../assets/data/FamilyFeud/data';

class GameFF extends Component {
  constructor() {
    super();
    this.state = {
      localStorageDataQuestions: JSON.parse(localStorage.getItem('reduxStateFF')).questionsReducerFF,
    };
  }

  componentWillMount() {
    this.onMount();
  }

  onMount() {
    window.addEventListener('storage', () => {
      this.setState({
        localStorageDataQuestions: JSON.parse(localStorage.getItem('reduxStateFF')).questionsReducerFF,
      });
    });
  }

  render() {
    const {
      activeQuestion,
      activeEnquiry,
      choosedAnswer,
      answers,
      totalScore,
      selectedTeam,
      playerList,
    } = this.state.localStorageDataQuestions;

    const generateWrong = (team) => {
      const wrongAnswers = [];
      if (answers[team] !== undefined) {
        for (let i = 0; i < answers[team].wrong; i += 1) {
          wrongAnswers.push(<div key={shortid.generate()}>X</div>);
        }
      }
      return wrongAnswers;
    };

    return (
      <div className="family-feud-game">
        <div className={`family-feud-game__left-points ${selectedTeam === playerList[0] ? 'active' : ''}`}>
          <h4>{playerList[0]}</h4>
          {(totalScore !== null && Object.keys(totalScore).length >= 1) ? (
            totalScore[playerList[0]] || '0'
          ) : (
            '0'
          )}
        </div>
        <div className="family-feud-game__table">
          <div className="score">
            {activeEnquiry !== null && (
              '0'
            )}
          </div>
          <div className="board">
            <div className="board__score-left">
              {generateWrong(playerList[0])}
            </div>
            <div className="board__score-questions">
              {activeEnquiry !== null ? (
                questionsMap[activeQuestion][activeEnquiry].answers.map((answer, index) => {
                  if (choosedAnswer.includes(index)) {
                    return (
                      <h3 key={answer.name}>
                        {index + 1}. {answer.name}
                        <span>{answer.score}</span>
                      </h3>
                    );
                  }
                  return (
                    <h3 key={answer.name}>
                      {index + 1}. ..............................
                      <span>...</span>
                    </h3>
                  );
                })
              ) : (
                <h2>welcome</h2>
              )}
              {activeEnquiry !== null && (
                <div className="board__sum">
                  {Object.keys(answers).length !== 0 ? (
                    (() => {
                      if (Object.keys(answers).length === 1) {
                        return `Sum: ${answers[Object.keys(answers)[0]].score}`;
                      }
                      return `Sum: ${answers[Object.keys(answers)[0]].score + answers[Object.keys(answers)[1]].score}`;
                    })()
                  ) : (
                    'Sum: 0'
                  )}
                </div>
              )}
            </div>
            <div className="board__score-right">
              {generateWrong(playerList[1])}
            </div>
          </div>
        </div>
        <div className={`family-feud-game__right-points ${selectedTeam === playerList[1] ? 'active' : ''}`}>
          <h4>{playerList[1]}</h4>
          {(totalScore !== null && Object.keys(totalScore).length >= 1) ? (
            totalScore[playerList[1]] || '0'
          ) : (
            '0'
          )}
        </div>
      </div>
    );
  }
}

export default GameFF;
