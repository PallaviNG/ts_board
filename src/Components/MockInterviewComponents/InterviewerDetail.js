import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { getInterviewerList, updateInterviewerByID } from './../../Service/interviewerService';
import { deleteTemplateAssignmentAction, saveAllInterviewersAction, saveAllTemplateFormAssignmentAction } from "../../redux/action/InterviewerAction";
import { Link } from 'react-router-dom';

function InterviewerDetail({ history, match }) {
    let interviewerList = useSelector(
        (state) => state.template_interviewerDetails.interviewers
    );
    let templateAssignedForms = useSelector((state) => state.template_interviewerDetails.templateAssignments);
    let dispatch = useDispatch();

    let [initialValues, setInitialValues] = useState({
        interviewer_name: "",
        email_id: "",
        phone_number: "",
        templateAssignmentFormsList: []
    });

    let [iTemplateAssignmentForms, setITemplateAssignmentForms] = useState([]);

    let [updatedInterviewerDetails, setUpdatedInterviewerDetails] = useState({});

    let removeAssignedTemplateFromList = (index) => {
        let assignedTemplateList = initialValues.templateAssignmentFormsList;
        iTemplateAssignmentForms = assignedTemplateList;
        setITemplateAssignmentForms(iTemplateAssignmentForms);
        iTemplateAssignmentForms.splice(index, 1);
        // dispatch(deleteTemplateAssignmentAction(index));
        setITemplateAssignmentForms(iTemplateAssignmentForms);

        let updatedInterviewerData = {};
        updatedInterviewerData = {
            _id: initialValues._id,
            interviewer_name: initialValues.interviewer_name,
            templateAssignmentFormsList: iTemplateAssignmentForms
        };
        updatedInterviewerDetails = updatedInterviewerData;
        setUpdatedInterviewerDetails({ ...updatedInterviewerDetails });

        updateInterviewerByID("update-interviewer-details", updatedInterviewerDetails)
            .then((result) => {
                if (result === undefined) return false;
                if (result.status === true && result.result.modifiedCount > 0 && result.result.matchedCount === 1) {
                    toast.success("Updated details!!");
                }
                else if (result.status === true && result.result.modifiedCount === 0 && result.result.matchedCount === 1)
                    toast.info("No changes made!!");
            });
    }


    useEffect(() => {
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
                setInitialValues({ ...initialValues });
                initialValues = singleInterviewerDetails[0];
                setInitialValues({ ...initialValues });
                dispatch(saveAllTemplateFormAssignmentAction(initialValues.templateAssignmentFormsList));
            }
        });
    }, []);

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
                            return (
                                <div className="templateSetCard" key={tIndex}>
                                    <p className="templateCardHeading" title="Template Name">
                                        <Link to={`/mock/single/template/detail/${templateSet._id}`}>
                                            {tIndex + 1} {templateSet.template_title}
                                        </Link>
                                        <div className="flex flex-no-wrap justify-content-flex-end align-content-center">
                                            <span className="deleteIcon" onClick={() => removeAssignedTemplateFromList(tIndex)} title="Delete Template"><i className="fa fa-minus-circle" aria-hidden="true"></i></span>
                                        </div>
                                    </p>
                                    <div className="templateQuestionSetCard" title="Question Answer Set">
                                        {/* {templateSet.questionSets.map((questionSet, qIndex) => {
                                    return (<div className="questionSetCard">
                                        <p className="question_answer_set_details" title="Question">
                                            {qIndex + 1} {questionSet.question}
                                        </p>
                                        <p className="question_answer_set_details" title="Answer">
                                            {questionSet.answer}
                                        </p>
                                    </div>)
                                })
                                } */}
                                        <div className="count_details">No. of Question Sets in Template: {templateSet.questionSets.length}</div>
                                    </div>

                                </div>)
                        })
                        }
                        <div className="count_details bg-info">Total No. of Templates: {initialValues.templateAssignmentFormsList.length}</div>
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