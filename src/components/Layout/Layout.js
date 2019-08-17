import React, {Component}from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSiderDrawer: true
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSiderDrawer: false
    })
  }
  render() {
    return (
      <Aux>
        <Toolbar />
        <SideDrawer open={this.state.showSiderDrawer} closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>);
  }
}

export default Layout;