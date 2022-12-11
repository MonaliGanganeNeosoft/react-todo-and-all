const initial = '';
const editorReducer = (state = initial, action) => {
  switch (action.type) {
    case "saveBody":
      return  action.payload

    default:
      return state;
  }
};
export default editorReducer;