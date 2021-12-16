import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { saveAllInterviewersAction } from "../../redux/action/InterviewerAction";
import {
  getInterviewerDetailsByID,
  getInterviewerList,
  updateInterviewerByID,
} from "./../../Service/interviewerService";
import { saveAllTemplateFormsAction } from "../../redux/action/TemplateAction";
import { getTemplateList } from "./../../Service/templateService";
import { toast } from "react-toastify";

function TemplateAssignment({ history, match }) {
  let interviewerList = useSelector(
    (state) => state.template_interviewerDetails.interviewers
  );
  let templateForms = useSelector(
    (state) => state.templateDetails.templateList
  );
  let dispatch = useDispatch();

  let [interviewerOptions, setInterviewerOptions] = useState([]);

  let [templateDetails, setTemplateDetails] = useState({});

  let [interviewerID, setInterviewerID] = useState();

  let [iTemplateAssignmentForms, setITemplateAssignmentForms] = useState([]);

  let initialValues = {
    interviewer_id: "",
  };

  let [updatedInterviewerDetails, setUpdatedInterviewerDetails] = useState({});

  useEffect(() => {
    getTemplateList("get-template-list").then((result) => {
      if (result === undefined) return false;
      dispatch(saveAllTemplateFormsAction(result.templateList));
    });

    var singleTemplateDetails = templateForms.filter(
      (template) => template._id === match.params.id
    );

    if (singleTemplateDetails.length === 0) {
      toast.error("No Template Found");
      history.replace("/mock/template/list");
    } else {
      let _templateDetails = {...templateDetails};
      _templateDetails = singleTemplateDetails[0];
      setTemplateDetails({ ..._templateDetails });
    }
  }, []);
  
  useEffect(() => {
    getInterviewerList("get-interviewer-list").then((result) => {
      if (result === undefined) return false;
      dispatch(saveAllInterviewersAction(result.interviewerList));
    });

    interviewerOptions = [];
    interviewerOptions.push({ value: 0, name: "-Select Interviewer-" });
    interviewerList.forEach((interviewer) => {
      interviewerOptions.push({
        value: interviewer._id,
        name: interviewer.interviewer_name,
      });
    });
    setInterviewerOptions([...interviewerOptions]);
  }, []);
  
  
  let onSubmit = () => {
    getInterviewerDetailsByID("get-interviewer-by-id", interviewerID).then(
      (result) => {
        if (result === undefined) return false;
        if(result.interviewers.length > 0)
        {
          let _interviewerDetails = result.interviewers[0];
          iTemplateAssignmentForms = _interviewerDetails.templateAssignmentFormsList;
          setITemplateAssignmentForms([...iTemplateAssignmentForms]);

          var templateMatchDetails = iTemplateAssignmentForms.filter(
            (template) => template._id === templateDetails._id
          );

          if(templateMatchDetails.length === 0 ) {
            iTemplateAssignmentForms.push(templateDetails);
            setITemplateAssignmentForms([...iTemplateAssignmentForms]);
          }

          let updatedInterviewerData = {...updatedInterviewerDetails};
          updatedInterviewerData = {
            _id: interviewerID,
            interviewer_name:_interviewerDetails.interviewer_name,
            templateAssignmentFormsList: iTemplateAssignmentForms,
          };
          updatedInterviewerDetails = updatedInterviewerData;
          setUpdatedInterviewerDetails({ ...updatedInterviewerDetails });
        }

        
        updateInterviewerByID("update-interviewer-details",updatedInterviewerDetails)
        .then((result) => {
          if (result === undefined ) return false;
          if(result.status === true  && result.result.modifiedCount > 0 && result.result.matchedCount ===1)  {
            toast.success("Updated details!!")
          }
          else if(result.status === true  && result.result.modifiedCount === 0 && result.result.matchedCount ===1)
          toast.info("No changes made!!");
        });
    
      });
  }

  return (
    <div className="content">
      <div className="formComponent flex flex-direction-column align-items-center justify-content-center">
        <h4 className="text-align-center">Template Assignment Form</h4>

        {templateDetails ? (
          <h5>Template Name: {templateDetails.template_title}</h5>
        ) : null}
        <div className="pop-up-container">
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
              <div className="pop-up-selector flex justify-content-center">
                <Field
                  name="interviewer_id"
                  as="select"
                  title="Trainer Name"
                  onChange={(e) => setInterviewerID(e.target.value)}
                  value={interviewerID}
                >
                  {interviewerOptions.map((interviewer, index) => (
                    <option key={index} value={interviewer.value}>
                      {interviewer.name}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="form-buttons">
                <button onClick={() => history.push("/mock/template/list")}>
                  Back to Template List
                </button>
                <button
                  type="submit"
                >
                  ASSIGN
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default TemplateAssignment;
