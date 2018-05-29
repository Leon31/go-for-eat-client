import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { FacebookButton, GoogleButton, LinkedinButton } from '../../components/Buttons';
import logo from '../../assets/logo/logo2x.png';
import styles from './styles';
import { loginUser, navigate } from '../../actions';
import {
  FACEBOOK_APP_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from 'react-native-dotenv';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }


  componentDidMount = async () => {

    await navigator.geolocation.getCurrentPosition(
      async (position) => {
        await this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
    );
  }


  loginGoogle = async () => {
    Expo.Google.logInAsync({
      androidClientId: GOOGLE_ANDROID_CLIENT_ID,
      iosClientId: GOOGLE_IOS_CLIENT_ID,
      scopes: ['profile', 'email', 'https://www.googleapis.com/auth/user.birthday.read'],
    })
      .then(result => {
        if (result.type === 'success') {
          let data = {
            id: result.user.id,
            accessToken: result.accessToken,
            idToken: result.idToken,
            network: 'google',
            position: this.state,
          };
          this.props.serverAuth(data);
        } else {
          return {cancelled: true};
        }
      })
      .catch(err => console.log(err));
  }

  loginFacebook = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
      permissions: ['public_profile', 'email', 'user_birthday'],
    });
    if (type === 'success') {
      return fetch(`https://graph.facebook.com/me?access_token=${token}`)
        .then(res => res.json())
        .then(data => {
          data.accessToken = token;
          data.network = 'facebook';
          data.position = this.state;
          const allowed = ['id', 'accessToken', 'network', 'position'];
          const filtered = Object.keys(data)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
              obj[key] = data[key];
              return obj;
            }, {});
          this.props.serverAuth(filtered);
        })
        .catch(err => console.log(err));
    }
  }

  loginLinkedin = async (result) => {

    if (result.access_token) {
      let data = {
        accessToken: result.access_token,
        network: 'linkedin',
        position: this.state,
      };
      this.props.serverAuth(data);
    } else {
      return {cancelled: true};
    }
  };

  render() {
    if (this.props.loading) {
      return (<Text>Loading!</Text>);}
    return (
      <View style={styles.login_container}>
        <View style={styles.login_logo}>
          <Image source={logo}/>
        </View>
        <Text style={styles.login_tagline}>
        Share your lunch with someone new,{'\n'} meet new people and create new contacts
        </Text>
        <FacebookButton loginFacebook={this.loginFacebook}/>
        <GoogleButton loginGoogle={this.loginGoogle}/>
        <LinkedinButton loginLinkedin={this.loginLinkedin}/>
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  serverAuth: (data) => dispatch(loginUser(data)),
  navigate: (screen) => dispatch(navigate(screen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
