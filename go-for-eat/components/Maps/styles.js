//MAP COMPONENT
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  map:{
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  center:{
    transform: [
      {'scale': 0.65},
    ]
  },
  center__onMove:{
    transform: [
      {'scale': 0.7},
    ],
    opacity:0.8,
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  center__hide:{
    opacity:0,
  },
  translateY: {
    marginBottom: 45,
    zIndex: 999,
  },
  marker: {
    zIndex: 1,
  },
});
