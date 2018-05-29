import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList, SectionList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { getNearbyEvents, setQueryState } from '../../actions';
import { Event } from '../Event';
import moment from 'moment';
import _ from 'lodash';
import s from './styles';

class EventList extends Component {
  constructor (props) {
    super(props);
  }

  loadMore = async () => {
    if (this.props.up) {
      const newQuery =  {
        to: Math.floor(new Date(moment((this.props.query.to+10000)).endOf('day')).getTime()),
        from: this.props.query.to,
      };
      await this.props.setQueryState(newQuery);
      this.props.getNearbyEvents(this.props.query);
    }
  }

  render() {
    return this.props.events.length > 0 ? (
      <SectionList
        style={s.list}
        renderSectionHeader={({section}) => {return (
          <View style={s.section_header}>
            <Text style={s.section_header_text}> {moment(section.title).format('Do MMMM')} </Text>
          </View>);
        }}
        sections={this.props.events}
        renderItem={({ item }) => <Event key={item} eventID={item}/>}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={item => item}
        // ListFooterComponent={this.renderFooter}
        onEndReached={this.loadMore}
        onEndReachedThreshold={0.1}
      />
    ) : <View style={{paddingVertical: 20}}>
      <ActivityIndicator size="large" color="#ffffff"/>
    </View>;
  }


  renderFooter = () => {
    return (
      <View style={s.list_footer}>
        <Text style={s.list_footer_text}>Scroll Down to load more events</Text>
      </View>
    );};

  renderSeparator = () => {
    return (
      <View
        style={{height: 1,width: '100%',backgroundColor: '#2ECC71',}}
      />
    );};
}

const mapStateToProps = (state) => ({
  events: state.pages.Home.events,
  query: state.pages.Maps.query,
});

const mapDispatchToProps = (dispatch) => ({
  setQueryState: (newQuery) => dispatch(setQueryState(newQuery)),
  getNearbyEvents: (queryString) => dispatch(getNearbyEvents(queryString)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
