import React from 'react';

import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => (
  <div 
    onClick={props.toggled}
    className={classes.DrawerToggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)
export default drawerToggle;