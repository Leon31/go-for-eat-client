import { StyleSheet, PixelRatio, Dimensions } from 'react-native';

const WINDOW = Dimensions.get('window');

export default StyleSheet.create({
  navbar_outer_container: {
    height: WINDOW.height == 812 ? 80 : 70,
    backgroundColor: '#2ECC71',
    borderBottomWidth:0,
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    paddingTop: 18,
    paddingBottom: 12,
  },
  navbar_inner_container: {
    height: 26,
  },
  navbar_logo: {
    height: 35,
    width: 85,
    marginBottom: -5,
  },
  navbar_title: {
    color: 'white',
    fontFamily:'Roboto',
    fontSize: 20,
    marginBottom: WINDOW.height == 812 ? 0 : 3,
  },
  navbar_icon: {
    paddingTop: 3,
    paddingBottom: 3,
    height: 22,
    width: 22,
  },
  create: {
  },
  profile: {
    height: 28,
    width: 28,
  },
  back: {
  },
  close: {
    paddingTop: 5,
    paddingBottom: 5,
    height: 18,
    width: 18,
  },
  logout: {
    paddingTop: 6,
    paddingBottom: 6,
    height: 22,
    width: 28,
  },
  check: {
    paddingBottom: 5,
    height: 20,
    width: 20,
  },
});
