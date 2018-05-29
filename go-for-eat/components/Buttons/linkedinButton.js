import React, { Component } from 'react';
import { View } from 'react-native';
import LinkedInModal from 'react-native-linkedin';
import { Button } from 'react-native-elements';
import styles from './styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
  LINKEDIN_REDIRECT_URL
} from 'react-native-dotenv';


class LinkedinButton extends Component {

  static propTypes = {
    navigation: PropTypes.object
  };

  render() {
    return (
      <View>
        <Button
          icon={{
            name:'linkedin',
            type:'font-awesome'
          }}
          title='Login with Linkedin'
          buttonStyle={styles.login_button__linkedin}
          onPress={() => this.modal.open()}
        />
        <LinkedInModal
          ref={ref => {
            this.modal = ref
          }}
          clientID={ LINKEDIN_CLIENT_ID }
          clientSecret={ LINKEDIN_CLIENT_SECRET }
          redirectUri={ LINKEDIN_REDIRECT_URL }
          linkText=''
          onSuccess={result => this.props.loginLinkedin(result)}
          onError={err => this.props.loginLinkedin(err)}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  serverAuth: (data) => dispatch(loginUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkedinButton);
