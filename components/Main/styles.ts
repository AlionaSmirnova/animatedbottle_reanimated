import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  layout: {
    flex: 1,
  },
  
  inputBlock: {
    marginHorizontal: 16,
    marginTop: 25,
  },
 
  kboard: {
    width: 60,
    height: 40,
    marginVertical: 25,
  },
  kboardBox:{
    justifyContent:'center',
    alignItems:'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kboardDisable:{
    backgroundColor:'gray',
    opacity:0.6,
    alignItems:'center',
    justifyContent:'center',
    width: 60,
    height: 40,
    marginVertical: 25,
    borderRadius:8,
  }
});
