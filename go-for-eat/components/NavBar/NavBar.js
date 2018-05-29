import React, { Component } from 'react';
import { View, Text, Image, Avatar, TouchableOpacity, ActionSheetIOS, Platform } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet'
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';

import { logoutUser, navigate, navigateBack, navigateLogin } from '../../actions';
import { logoutStorage } from '../../localStorage';

import navNew from '../../assets/icons/nav_new.png';
import navBack from '../../assets/icons/nav_back.png';
import navProfile from '../../assets/icons/nav_profile.png';
import navLogout from '../../assets/icons/nav_logout.png';
import navClose from '../../assets/icons/nav_close.png';
import navCheck from '../../assets/icons/nav_check.png';
import logo from '../../assets/logo/logo2x.png';
import style from './styles.js';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {screen: this.props.screen};
  }

  componentWillMount() {
    this.handleNavBack = debounce(this.handleNavBack, 1000);
    this.handleMyProfile = debounce(this.handleMyProfile, 1000);
    this.handleCreate = debounce(this.handleCreate, 1000);
    this.handleLogout = debounce(this.handleLogout, 1000);
  }

  handleNavBack = () => {
    this.props.navigateBack();
  }

  handleMyProfile = () => {
    this.props.navigate('Profile');
  }

  handleCreate = () => {
    this.props.navigate('CreateEvent');
  }

  handleLogout = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions({
        options: ['Logout', 'Cancel'],
        cancelButtonIndex: 1,
        tintColor: '#2ECC71'
      },
      (buttonIndex) => {
        switch (buttonIndex) {
        case 0:
          const serializedState = JSON.stringify({});
          this.props.navigateLogin();
          Expo.SecureStore.setItemAsync('state', serializedState);
          this.props.logoutState();
          break;
        }
      });
    } else {this.actionSheet.show()}
  }

  getActionSheetRef = ref => (this.actionSheet = ref)

  handleLogoutActionSheetPress = (buttonIndex) => {
    switch (buttonIndex) {
    case 0:
      const serializedState = JSON.stringify({});
      this.props.navigateLogin();
      Expo.SecureStore.setItemAsync('state', serializedState);
      this.props.logoutState();
      break;
    }
  }



  renderButton = (button) => {
    return (
      <TouchableOpacity
        onPress={button.onPress}
      >
        <Image
          style={[style.navbar_icon, button.style]}
          source={button.icon}

        />
      </TouchableOpacity>
    );
  }


  render () {
    const allButtons = {
      create: {
        onPress:this.handleCreate,
        icon: navNew,
        style: style.create,
      },
      profile: {
        onPress:this.handleMyProfile,
        icon: navProfile,
        style: style.profile,
      },
      back: {
        onPress:this.handleNavBack,
        icon: navBack,
        style: style.back,
      },
      close: {
        onPress:this.handleNavBack,
        icon:navClose,
        style: style.close,
      },
      logout: {
        onPress:this.handleLogout,
        icon:navLogout,
        style: style.logout,
      },
    };

    const buttons = {};
    if (this.state.screen==='Home' || this.state.screen==='Rating') {
      buttons.center = <Image source={logo} style={style.navbar_logo}/>;
    } else if (this.state.screen === 'CreateEvent') {
      buttons.center = <View><Text style={style.navbar_title}>Create Event</Text></View>;
    } else if (this.state.screen === 'EditEvent') {
      buttons.center = <View><Text style={style.navbar_title}>Edit Event</Text></View>;
    } else {
      buttons.center = <View><Text style={style.navbar_title}>{this.state.screen}</Text></View>;
    };

    if (this.state.screen === 'Home') {
      buttons.left = this.renderButton(allButtons.create);
      buttons.right = this.renderButton(allButtons.profile);
      // buttons.left = this.renderButton(allButtons.filter);
    } else if (this.state.screen === 'Profile') {
      buttons.left = this.renderButton(allButtons.close);
      buttons.right = this.renderButton(allButtons.logout);
    } else if (this.state.screen === 'User') {
      buttons.left = this.renderButton(allButtons.close);
      buttons.right = null;
    } else if (this.state.screen === 'CreateEvent') {
      buttons.left = this.renderButton(allButtons.close);
      buttons.right = null;
    } else if (this.state.screen === 'EditEvent') {
      buttons.left = this.renderButton(allButtons.close);
      buttons.right = null;
    } else if (this.state.screen === 'Rating') {
      buttons.left = this.renderButton(allButtons.close);
      buttons.right = null;
    } else if (this.state.screen === 'Filter') {
      buttons.left = this.renderButton(allButtons.close);
      buttons.right = null;
    } else {
      buttons.left = null;
      buttons.right = null;
    }
    return (
      <View>
        <Header
          leftComponent={buttons.left}
          centerComponent={buttons.center}
          rightComponent={buttons.right}
          outerContainerStyles={style.navbar_outer_container}
          innerContainerStyles={style.navbar_inner_container}
        />
        <ActionSheet
          ref={this.getActionSheetRef}
          options={[{component: <Text style={{ color: '#2ECC71', fontSize: 22}}>Logout</Text>,height: 60}, 'Cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
          onPress={this.handleLogoutActionSheetPress}
          tintColor={'#2ECC71'}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nav:state.nav,
  screen:state.pages.currentScreen,
  user:state.authentication
});

const mapDispatchToProps = dispatch => ({
  logoutState:() => dispatch(logoutUser()),
  navigate: (screen) => dispatch(navigate(screen)),
  navigateBack: () => dispatch(navigateBack()),
  navigateLogin: () => dispatch(navigateLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
