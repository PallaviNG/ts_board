let initState = {
    questionSets: [],
  };
  
  export const DynamicComponentReducer = (state = initState, action) => {
    var { type, payload } = action;
    switch (type) {
      case "SAVE_NEW_DYNAMIC_COMPONENT":
        return { ...state, questionSets: payload };
      case "SAVE_ALL_TEMPLATE_DETAILS":
        return { ...state, questionSets: payload };
      case "DELETE_TEMPLATE":
        let removeQuestionSet = [...state.questionSets];
        removeQuestionSet.splice(payload, 1);
        return { ...state, questionSets: removeQuestionSet };
      default:
        return { ...state };
    }
  };
  