import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  input: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'teal',
    height: 60,
    fontSize: 20,
    color: 'black',
    width: 200,
  },
  label: {
    position: 'absolute',
    marginLeft: -10,
  },
  inputDisabled: {
    color: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    height: 60,
    fontSize: 20,
    width: 200,
  },
});
