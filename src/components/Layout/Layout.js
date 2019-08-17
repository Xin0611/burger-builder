import React, {Component}from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSiderDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSiderDrawer: false
    });
  }

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return {showSiderDrawer: !prevState.showSiderDrawer}
    });
  }
  render() {
    return (
      <Aux>
        <Toolbar toggled={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSiderDrawer} closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>);
  }
}

export default Layout;