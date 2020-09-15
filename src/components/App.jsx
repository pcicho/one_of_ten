import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { List, ListItem } from '@material-ui/core';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import shortid from 'shortid';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import SubdirectoryArrowRight from '@material-ui/icons/SubdirectoryArrowRight';
import Home from './views/Home/Home';
import OneOfTen from './views/OneOfTen/OneOfTen';
import '../assets/scss/main.scss';
import ScrollBar from './views/Shared/Scrollbar';
import GameOOT from './views/OneOfTen/components/Game/GameOOT';
import GameFF from './views/FamilyFeud/components/Game/GameFF';
import DashboardOOT from './views/OneOfTen/components/Game/DashboardOOT';
import DashboardFF from './views/FamilyFeud/components/Game/DashboardFF';
import FamilyFeud from './views/FamilyFeud/FamilyFeud';
import Questions from './views/Shared/Questions';

import OneOfTenData from '../assets/data/OneOfTen/data';
import FamilyFeudData from '../assets/data/FamilyFeud/data';

class App extends Component {
  constructor() {
    super();
    this.state = {
      snackbarOpen: false,
      reducerName: '',
    };
  }

  handleReset = () => {
    this.props.dispatch({
      type: `STEP_RESET_${this.state.reducerName}`,
    });
  };

  handleOpenSnackbar = (ev, reducerName) => {
    this.setState({
      snackbarOpen: true,
      reducerName,
    });
  }

  handleCloseSnackbar = () => {
    this.setState({
      snackbarOpen: false,
    });
  }

  checkGame = (location) => {
    if (location.pathname === '/one-of-ten/game' || location.search.includes('game=OOT')) {
      return true;
    }
    if (location.pathname === '/family-feud/game' || location.search.includes('game=FF')) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <div>
        <CssBaseline />
        <Router>
          <Route
            render={({ location }) => (
              <Grid container className="no-paddings background-primary full-height">
                {!this.checkGame(location) && (
                <Grid item sm={2} className="primary-bg">
                  <List component="nav">
                    <ListItem
                      className="white-text"
                      button
                      component={Link}
                      to="/"
                      style={{ color: '#ffffff', borderBottom: '1px solid rgba(255, 255, 255, 0.20)' }}
                    >
                      Home
                    </ListItem>
                    <ListItem
                      className="white-text"
                      button
                      component={Link}
                      to="/one-of-ten"
                      style={{ color: '#ffffff' }}
                    >
                      One of ten
                    </ListItem>
                    <ListItem
                      className="white-text"
                      button
                      component={Link}
                      to="/one-of-ten/questions"
                      style={{ color: '#ffffff', fontSize: '.8em', padding: '5px 24px' }}
                    >
                      <SubdirectoryArrowRight style={{ width: '20px', marginBottom: '4px' }} /> Questions
                    </ListItem>
                    {this.props.stepperReducerOOT.gameStart === true && (
                      <ListItem
                        className="white-text"
                        button
                        component={Link}
                        to="/one-of-ten/dashboard"
                        style={{ color: '#ffffff', fontSize: '.8em', padding: '5px 24px' }}
                      >
                        <SubdirectoryArrowRight style={{ width: '20px', marginBottom: '4px' }} /> Dashboard
                      </ListItem>
                    )}
                    {this.props.stepperReducerOOT.gameStart === true && (
                      <ListItem
                        className="white-text"
                        button
                        component={Button}
                        onClick={ev => this.handleOpenSnackbar(ev, 'OOT')}
                        style={{
                          color: '#ffffff', fontSize: '.8em', padding: '5px 24px', textTransform: 'none',
                        }}
                      >
                        <SubdirectoryArrowRight style={{ width: '20px', marginBottom: '4px' }} /> Reset
                      </ListItem>
                    )}
                    <ListItem
                      className="white-text"
                      button
                      component={Link}
                      to="/family-feud"
                      style={{ color: '#ffffff', borderTop: '1px solid rgba(255, 255, 255, 0.20)' }}
                    >
                      Family Feud
                    </ListItem>
                    <ListItem
                      className="white-text"
                      button
                      component={Link}
                      to="/family-feud/questions"
                      style={{ color: '#ffffff', fontSize: '.8em', padding: '5px 24px' }}
                    >
                      <SubdirectoryArrowRight style={{ width: '20px', marginBottom: '4px' }} /> Questions
                    </ListItem>
                    {this.props.stepperReducerFF.gameStart === true && (
                      <ListItem
                        className="white-text"
                        button
                        component={Link}
                        to="/family-feud/dashboard"
                        style={{ color: '#ffffff', fontSize: '.8em', padding: '5px 24px' }}
                      >
                        <SubdirectoryArrowRight style={{ width: '20px', marginBottom: '4px' }} /> Dashboard
                      </ListItem>
                    )}
                    {this.props.stepperReducerFF.gameStart === true && (
                      <ListItem
                        className="white-text"
                        button
                        component={Button}
                        onClick={ev => this.handleOpenSnackbar(ev, 'FF')}
                        style={{
                          color: '#ffffff', fontSize: '.8em', padding: '5px 24px', textTransform: 'none',
                        }}
                      >
                        <SubdirectoryArrowRight style={{ width: '20px', marginBottom: '4px' }} /> Reset
                      </ListItem>
                    )}
                  </List>
                </Grid>
              )}
                <Grid
                  item
                  sm={!this.checkGame(location) ? 10 : 12}
                  className="secondary-bg"
                >
                  <TransitionGroup>
                    <CSSTransition
                      key={location.key}
                      classNames="fade"
                      timeout={1000}
                    >
                      <ScrollBar>
                        <main className="content-global">
                          <Snackbar
                            className="snackbar--hard"
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                            }}
                            open={this.state.snackbarOpen || false}
                            autoHideDuration={null}
                            onClose={this.handleCloseSnackbar}
                            ContentProps={{
                              'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">If you click the continue button you lose all progress</span>}
                            action={[
                              <Button
                                key={shortid.generate()}
                                style={{ color: '#ffffff' }}
                                component={Link}
                                exact="true"
                                to={this.state.reducerName === 'OOT' ? '/one-of-ten' : '/family-feud'}
                                onClick={() => {
                                  this.handleReset();
                                  this.handleCloseSnackbar();
                                }}
                              >
                                Continue
                              </Button>,
                              <Button
                                key={shortid.generate()}
                                style={{ color: '#ffffff' }}
                                onClick={this.handleCloseSnackbar}
                              >Back
                              </Button>,
                            ]}
                          />
                          <Switch location={location}>
                            {location.search.includes('game=OOT') && (
                              <Route component={GameOOT} />
                            )}
                            {location.search.includes('game=FF') && (
                              <Route component={GameFF} />
                            )}
                            <Route exact path="/" render={() => Home} />
                            <Route exact path="/one-of-ten" render={() => <OneOfTen handleOpenSnackbarGlobal={this.handleOpenSnackbar} />} />
                            <Route exact path="/one-of-ten/game" render={() => GameOOT} />
                            <Route exact path="/one-of-ten/dashboard" render={() => DashboardOOT} />
                            <Route exact path="/one-of-ten/questions" render={() => <Questions data={OneOfTenData} />} />
                            <Route exact path="/family-feud" render={() => <FamilyFeud handleOpenSnackbarGlobal={this.handleOpenSnackbar} />} />
                            <Route exact path="/family-feud/game" render={() => GameFF} />
                            <Route exact path="/family-feud/dashboard" render={() => DashboardFF} />
                            <Route exact path="/family-feud/questions" render={() => <Questions data={FamilyFeudData} />} />
                            <Route render={() => <Home />} />
                          </Switch>
                        </main>
                      </ScrollBar>
                    </CSSTransition>
                  </TransitionGroup>
                </Grid>
              </Grid>
          )}
          />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stepperReducerOOT: state.stepperReducerOOT,
  stepperReducerFF: state.stepperReducerFF,
});

export default connect(mapStateToProps)(App);

