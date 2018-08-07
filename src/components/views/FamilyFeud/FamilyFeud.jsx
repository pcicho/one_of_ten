import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import GameIco from '@material-ui/icons/Gamepad';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Steper from '../Shared/Steper';


class OneOfTen extends Component {
  static propTypes = {
    handleOpenSnackbarGlobal: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      snackgarToggle: false,
    };
  }

  handleCloseSnackbar = () => {
    this.setState({
      snackgarToggle: false,
    });
  }

  handleOpenSnackbar = () => {
    this.setState({
      snackgarToggle: true,
    });
  }

  render() {
    return (
      <div className="games">
        <Chip
          label="Family Feud"
          avatar={
            <Avatar>
              <GameIco />
            </Avatar>
          }
        />
        <Steper
          handleOpenSnackbar={this.handleOpenSnackbar}
          handleOpenSnackbarGlobal={this.props.handleOpenSnackbarGlobal}
          playerNumber={2}
          inputPlaceholder="Enter team name"
          reducerName="FF"
        />
        <Snackbar
          className="snackbar--hard"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.snackgarToggle}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Please enter all players names</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}


export default OneOfTen;
