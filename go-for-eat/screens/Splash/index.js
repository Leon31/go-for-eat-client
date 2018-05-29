import React, { Component } from 'react';
import { Text, View, Animated, Image, Easing } from 'react-native';
import { connect } from 'react-redux';
import s from './styles';
import { setUser, setEntities, navigate, reloadUser } from '../../actions';

class LoadingPage extends Component {
  constructor (props) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount = async () => {
    this.spin();
    await navigator.geolocation.getCurrentPosition(
      async (position) => {
        await this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        await this.loginExpo();
      }
    );
  }

  loginExpo = () => {
    Expo.SecureStore.getItemAsync('state')
      .then(userData => {
        if (userData) {
          let user = JSON.parse(userData).authentication;
          let entities = JSON.parse(userData).entities;
          if (entities) this.props.setEntities(entities);
          if (user.user && user.user._id) {
            this.props.setUser(user);
            this.props.reloadUser(this.state);
            this.props.navigate('Home');
          } else {
            this.props.navigate('Login');
          }
        } else {
          this.props.navigate('Login');
        }
      });
  }

  spin () {
    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
    ).start(() => this.spin());
  }

  render () {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={s.container}>
        <Animated.Image
          style={{
            transform: [{rotate: spin}, {scale: 0.2}] }}
          source={require('../../assets/logo/appIcon.png')}
        />
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
  user:state.authentication
});

const mapDispatchToProps = (dispatch) => ({
  setUser: user => dispatch(setUser(user)),
  navigate: (screen) => dispatch(navigate(screen)),
  setEntities: (data) => dispatch(setEntities(data)),
  reloadUser: (data) => dispatch(reloadUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingPage);
