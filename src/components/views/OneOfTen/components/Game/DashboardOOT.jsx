import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { Chip } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import GameIco from '@material-ui/icons/Gamepad';
import DashboardInput from './DashboardInput';


const styles = {
  root: {
    marginRight: '10px',
    cursor: 'pointer',
  },
};

const DashboardOOT = (props) => {
  const { classes } = props;
  const { playerList, playerChances } = props.playersReducerOOT;
  return (
    <div className="dashboard-one-of-ten">
      <Chip
        className={`chip-link--hard ${classes.root}`}
        label="One of ten"
        component={Link}
        to="/one-of-ten"
        avatar={
          <Avatar>
            <GameIco />
          </Avatar>
        }
      />
      <Chip
        label="Dashboard"
      />
      <div className="dashboard-input__container">
        {playerList.map((player, index) => (
          <DashboardInput checkedCheckboxes={playerChances[index]} player={player} index={index} key={index} /> //eslint-disable-line
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  playersReducerOOT: state.playersReducerOOT,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(DashboardOOT);

