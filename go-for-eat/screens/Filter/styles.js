//MAP COMPONENT
import { Dimensions, PixelRatio, StyleSheet } from 'react-native';

const WINDOW = Dimensions.get('window');

export default StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
    paddingTop: 20,
    alignItems: 'stretch',
  },
  title: {
    width: WINDOW.width - 40,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 22,
    fontFamily: 'Roboto',
    justifyContent: 'flex-start',
    marginBottom: 6,
  },
  JobsAutocompleteContainer: {
    position: 'relative',
    height: 80,
    width: WINDOW.width,
    zIndex: 200,
  },
  textInputContainer: {
    height: 44,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1,
    height: '100%',
    width: WINDOW.with - 40,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 0,
    borderBottomWidth: 5 / PixelRatio.get(),
    borderBottomColor: '#2ECC71',
    fontSize: 20,
  },
  slider: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 40,
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: '#30a935',
    borderWidth: 2,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  goButton: {
    backgroundColor: '#2ECC71',
    borderRadius: 2,
    paddingHorizontal: 30,
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  goButtonText: {
    color: '#FFF',
  },
  rating_star_container:{
    justifyContent: 'center',
    flexDirection:'row',
    margin:20,
    marginBottom:50,
  },
  rating_star:{
    height:35,
    width:35,
    margin: 5,
  },
});
