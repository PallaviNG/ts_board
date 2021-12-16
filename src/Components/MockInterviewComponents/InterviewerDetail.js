import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { saveAllTemplateFormsAction } from "../../redux/action/TemplateAction";
import { getTemplateList } from './../../Service/templateService';
import { getInterviewerList } from './../../Service/interviewerService';
import { saveAllInterviewersAction } from "../../redux/action/InterviewerAction";

function InterviewerDetail({ history, match }) {
    let interviewerList = useSelector(
        (state) => state.template_interviewerDetails.interviewers
    );
    let dispatch = useDispatch();

    let [initialValues, setInitialValues] = useState({
        interviewer_name: "",
        email_id: "",
        phone_number: "",
        templateAssignmentFormsList: []
    });

    useEffect(() => {
        // console.log(interviewerList);
        getInterviewerList("get-interviewer-list").then((result) => {
            if (result === undefined) return false;
            console.log(result);
            dispatch(saveAllInterviewersAction(result.interviewerList));
            var singleInterviewerDetails = interviewerList.filter(
                (interviewer) => interviewer._id === match.params.id
            );
            if (singleInterviewerDetails.length === 0) {
                toast.error("No Interviewer Found");
                history.replace("/mock/template/interviewer/list");
            } else {
                setInitialValues(singleInterviewerDetails[0]);
            }
        });
    }, []);


    // console.log(initialValues);

    return (
        <div className="content">
            <div className="formComponent  flex flex-direction-column align-items-center justify-content-center">
                <h4 className="text-align-center">Interviewer Details</h4>
                <div className="interviewerDetailParentContainer flex flex-direction-column align-items-center">
                <p className="single_interviewer_details detail_heading" title="Interviewer Name" >
                    {initialValues.interviewer_name}
                </p>
                <p className="single_interviewer_details sub_detail_heading" title="Email ID" >
                    {initialValues.email_id}
                </p>
                <p className="single_interviewer_details" title="Phone Number" >
                    {initialValues.phone_number}
                </p>

                <div className="interviewer_templates_container flex flex-direction-column align-content-center" title="Template Assignment Set">
                    {initialValues.templateAssignmentFormsList.map((templateSet, tIndex) => {
                        return (<div className="templateSetCard">
                            <p className="templateCardHeading" title="Template Name">
                                {tIndex + 1} {templateSet.template_title}
                                <div className="flex flex-no-wrap justify-content-flex-end align-content-center">
                                    <span className="deleteIcon" title="Delete Template"><i className="fa fa-minus-circle" aria-hidden="true"></i></span>
                                </div>
                            </p>
                            <div className="templateQuestionSetCard" title="Question Answer Set">
                                {templateSet.questionSets.map((questionSet, qIndex) => {
                                    return (<div className="questionSetCard">
                                        <p className="question_answer_set_details" title="Question">
                                            {qIndex + 1} {questionSet.question}
                                        </p>
                                        <p className="question_answer_set_details" title="Answer">
                                            {questionSet.answer}
                                        </p>
                                    </div>)
                                })
                                }
                                <div className="count_details">No. of Questions: {templateSet.questionSets.length}</div>
                            </div>

                        </div>)
                    })
                }
                <div className="count_details">No. of Templates: {initialValues.templateAssignmentFormsList.length}</div>
                </div>
                <div className="form-buttons">
                    <button onClick={() => history.push("/mock/template/list")}>
                        <span className="backIcon"><i className="fa fa-hand-o-left" aria-hidden="true"></i> </span> Template List
                    </button>
                    <button onClick={() => history.push("/mock/template/interviewer/list")}>
                        <span className="backIcon"><i className="fa fa-hand-o-left" aria-hidden="true"></i> </span> Interviewer List
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default InterviewerDetail;