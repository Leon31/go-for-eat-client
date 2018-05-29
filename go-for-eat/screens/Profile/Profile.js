import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserBio } from '../../components/UserBio';
import { SectionList, ScrollView, View, Text } from 'react-native';
import { Event } from '../../components/Event';
import { formProfilePage } from '../../actions';
import s from './styles';

class Profile extends Component {

  componentDidMount () {
    this.props.formProfilePage(this.props.allEvents, this.props.user);
  }

  renderSeparator = () => {
    return (
      <View
        style={{height: 1,width: '100%',backgroundColor: '#2ECC71',}}
      />
    );
  };

  render() {
    if ((!this.props.user )|(!this.props.events)) return null;

    return (
      <ScrollView>
        <UserBio user={this.props.user}/>
        <SectionList
          style={s.list}
          renderSectionHeader={({section}) => {return (
            <View style={s.section_header}>
              <Text style={s.section_header_text}> {section.title}</Text>
            </View>);
          }}
          sections={this.props.events}
          renderItem={({ item }) => <Event key={item} eventID={item}/>}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={item => item}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  user:state.authentication.user,
  allEvents:state.entities.events,
  events:state.pages.Profile.events,
});

const mapDispatchToProps = (dispatch) => ({
  formProfilePage: (events, user) => dispatch(formProfilePage(events, user)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
