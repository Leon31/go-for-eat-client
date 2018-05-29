import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { NavBar } from '../components/NavBar';
import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';
import User from '../screens/User';
import Profile from '../screens/Profile/Profile';
import { CreateEvent } from '../screens/CreateEvent';
import { EditEvent } from '../screens/EditEvent';
import LoadingPage from '../screens/LoadingPage';
import Splash from '../screens/Splash';
import { Rating } from '../screens/Rating';
import Filter from '../screens/Filter/Filter';

const NavigatorWithRootScreen = (routeName, screen) => {
  return StackNavigator({
    [routeName] : {
      screen,
      navigationOptions:{
        gesturesEnabled:false,
        header:(<NavBar/>),
      }
    }
  });
};


const HomeStack = StackNavigator({
  Home: {
    screen: NavigatorWithRootScreen('Home', Home),
    navigationOptions:{header:()=>null}
  },
  User: {
    screen: NavigatorWithRootScreen('User', User),
    navigationOptions:{header:()=>null}
  },
  CreateEvent: {
    screen:NavigatorWithRootScreen('CreateEvent', CreateEvent),
    navigationOptions:{header:()=>null},
  },
  EditEvent: {
    screen:NavigatorWithRootScreen('EditEvent', EditEvent),
    navigationOptions:{header:()=>null}
  },
  Profile: {
    screen: NavigatorWithRootScreen('Profile', Profile),
    navigationOptions:{header:()=>null}
  },
  Rating: {
    screen: NavigatorWithRootScreen('Rating', Rating),
    navigationOptions:{header:() => null}
  },
  Filter: {
    screen: NavigatorWithRootScreen('Filter', Filter),
    navigationOptions:{header:() => null}
  }
},
{
  mode: 'modal',
  headerMode: 'none'
}
);

export const AppNavigator = StackNavigator({
  Splash:{
    screen: Splash,
    navigationOptions:{header:()=>null}
  },
  Login: {
    screen: Login,
    navigationOptions:{header:()=>null}
  },
  Loading:{
    screen:LoadingPage,
    navigationOptions:{header:()=>null}
  },
  HomeStack: {
    screen: HomeStack,
    navigationOptions: {
      gesturesEnabled: false,
    }
  }
});

class AppWithNavigationState extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator
        navigation = {addNavigationHelpers({
          dispatch,
          state:nav,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav:state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
