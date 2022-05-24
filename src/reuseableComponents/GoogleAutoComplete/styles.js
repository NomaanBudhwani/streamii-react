import { Colors, Fonts } from "../../theme";

export default styles = {
  textInputContainer: {
    backgroundColor: Colors.shark,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 15,
    marginBottom: 5
  },
  textInput: {
    height: 35,
    marginBottom: 0,
    backgroundColor: Colors.shark,
    ...Fonts.Regular(14),
    paddingLeft: 15
  },
  row: {
    backgroundColor: Colors.shark
  },
  poweredContainer: {
    backgroundColor: Colors.shark
  },
  description: {
    ...Fonts.Regular(14),
  },
  separator: {
    backgroundColor: Colors.border
  }
}