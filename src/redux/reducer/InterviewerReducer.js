let initState = {
    interviewers: [],
    templateAssignments: []
  };
  
  export const InterviewerReducer = (state = initState, action) => {
    var { type, payload } = action;
    switch (type) {
      case "ASSIGN_NEW_TEMPLATE":
        let new_template_assignment_list = [...state.templateAssignments];
        new_template_assignment_list.push(payload);
        return { ...state, templateAssignments: new_template_assignment_list, interviewers: [] };

      case "ADD_NEW_INTERVIEWER":
        let new_interviewer = [...state.interviewers];
        new_interviewer.push(payload);
        return { ...state, interviewers: new_interviewer};
  
      case "SAVE_ALL_INTERVIEWER_DETAILS":
        return { ...state, interviewers: payload };
  
      case "SAVE_ALL_TEMPLATE_ASSIGNMENT_FORMS":
        return { ...state, templateAssignments: payload };
  
      case "DELETE_TEMPLATE_ASSIGNMENT":
        let removeTemplate = [...state.templateAssignments];
        removeTemplate.splice(payload, 1);
        return { ...state, templateAssignments: removeTemplate };
  
      case "DELETE_INTERVIEWER_DETAILS":
        let removeInterviewerDetails = [...state.interviewers];
        removeInterviewerDetails.splice(payload, 1);
        return { ...state, interviewers: removeInterviewerDetails };
  
      default:
        return { ...state };
    }
  };
  