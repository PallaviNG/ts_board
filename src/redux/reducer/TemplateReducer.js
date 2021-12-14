let initState = {
  templateQuestionSet: [],
  templateList: []
};

export const TemplateReducer = (state = initState, action) => {
  var { type, payload } = action;
  switch (type) {
    case "SAVE_NEW_TEMPLATE":
      let new_template_list = [...state.templateList];
      new_template_list.push(payload);
      return { ...state, templateList: new_template_list, templateQuestionSet: [] };

    case "SAVE_ALL_TEMPLATE_DETAILS":
      return { ...state, templateQuestionSet: payload };

    case "SAVE_ALL_TEMPLATE_FORMS":
      return { ...state, templateList: payload };

    case "DELETE_TEMPLATE":
      let removeTemplate = [...state.templateQuestionSet];
      removeTemplate.splice(payload, 1);
      return { ...state, templateQuestionSet: removeTemplate };
      
    default:
      return { ...state };
  }
};
