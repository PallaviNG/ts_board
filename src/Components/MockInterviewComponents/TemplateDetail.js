import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

function TemplateDetail({ history, match }) {
  let templateList = useSelector((state) => state.templateDetails.templateList);

  let [initialValues, setInitialValues] = useState({
    template_title: "",
    dynamicComponent: [],
  });

  useEffect(() => {
    var singleTemplateDetails = templateList.filter(
      (template) => template._id === match.params.id
    );
    if (singleTemplateDetails.length === 0) {
      toast.error("No Template Found");
      history.replace("/mock/template/list");
    } else {
      setInitialValues(singleTemplateDetails[0]);
    }
    console.log(initialValues);
  }, [initialValues]);


  return (
    <div className="content">
      <div className="formComponent flex flex-direction-column align-items-center justify-content-center">
        <h4 className="text-align-center">Template Details</h4>

        <div className="titleComponent dc TextStyle">
          <p className="template_form_details" title="Template Title" >
            {initialValues.template_title}
          </p>
        </div>

        <div className="template_form_question_answer_details" title="Question Answer Set">
          {initialValues.questionSets.map((questionSet) => {
            return (<div className="questionSetCard">
              <p className="question_answer_set_details" title="Question">
                {questionSet.question}
              </p>
              <p className="question_answer_set_details" title="Answer">
                {questionSet.answer}
              </p>
            </div>)
          })
          }

        </div>
        <div className="form-buttons">
          <button onClick={() => history.push("/mock/template/list")}>
            Back to Template List
          </button>
        </div>
      </div>
    </div>
  );
}

export default TemplateDetail;
