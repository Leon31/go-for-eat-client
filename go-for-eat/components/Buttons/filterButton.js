import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';

const FilterButton = (props) => {
    return (
      <View style={styles.filter_button}>
        <Icon
          raised
          size={20}
          name='filter'
          type='font-awesome'
          color='#2ECC71'
          containerStyle={styles.filter_button_icon}
          onPress={props.filterEvent} />
      </View>
    );
};

export default FilterButton;

