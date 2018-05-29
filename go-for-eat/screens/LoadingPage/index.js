import React, { Component } from 'react';
import { Text, View, Animated, Image, Easing } from 'react-native';
import s from './styles';

class LoadingPage extends Component {
  constructor () {
    super();
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount () {
    this.spin();
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

export default LoadingPage;
