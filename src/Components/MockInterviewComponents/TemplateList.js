import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeTemplate, getTemplateList } from '../../Service/templateService';
import { deleteTemplateAction, saveAllTemplateFormsAction } from '../../redux/action/TemplateAction';
import PopupDialog from './PopupDialog';

function TemplateList({ history }) {
    let templateForms = useSelector((state) => state.templateDetails.templateList);
    let dispatch = useDispatch();

    let assignTemplate = (index, _id) => {
        history.push("/mock/template/interviewer/assignment/" + _id);
    };

    let [showPopup, setShowPopup] = useState(false);

    let deleteTemplate = (index, _id) => {
        removeTemplate("delete-template-by-id", _id).then((result) => {
            if (
                result.status === true &&
                result.result.deletedCount === 1 &&
                result !== undefined
            ) {
                dispatch(deleteTemplateAction(index));
                history.push("/mock/template/list");
            } else toast.error("Unable to delete template");
        });
    };

    useEffect(() => {
        getTemplateList("get-template-list").then((result) => {
            if (result === undefined) return false;
            dispatch(saveAllTemplateFormsAction(result.templateList));
        });
    }, []);

    return (

        <div className="content">
            <div className="formComponent">
                <h4 className="text-align-center">List of Templates</h4>
               { templateForms.length === 0 ? <><div>No Templates Found</div>
               <div><Link to="/mock/template/new">Create New Template?</Link></div></> :
                <>
                    <div className="parent_card flex flex-wrap align-items-center justify-content-center">
                        {templateForms.map((template, index) => {
                            return (
                                <div
                                    className="card template_card flex flex-direction-column justify-content-center"
                                    key={index}
                                >

                                    <p className="batch_details" title="Template Title">
                                        {template.template_title}
                                    </p>
                                    <Link to={`/mock/single/template/detail/${template._id}`}>

                                        <div className="questionSetCardContainer" title="Question Set">
                                            {template.questionSets.map((questionSet, qIndex) => {
                                                return (<div className="questionSetCard" key={qIndex}>
                                                    <p className="question_answer_details flex align-content-center" title="Question">
                                                        {qIndex + 1} {questionSet.question}
                                                    </p>
                                                    <p className="question_answer_details flex align-content-center" title="Answer">
                                                        {questionSet.answer}
                                                    </p>
                                                </div>)
                                            })
                                            }
                                        </div>

                                    </Link>

                                    <div className="templateIcons">
                                        <span className="deleteIcon" title="DELETE" onClick={() => deleteTemplate(index, template._id)}>
                                            <i className="fa fa-2x fa-trash" aria-hidden="true"></i>
                                        </span>
                                        <span className="assignIcon" title="ASSIGN" onClick={() =>
                                            assignTemplate(index, template._id)
                                        }>
                                            <i className="fa fa-2x fa-user-plus" aria-hidden="true"></i>
                                        </span>
                                        {/* <span className="assignIcon" title="ASSIGN" onClick={() => {setShowPopup(!showPopup);}}>
                                        <i className="fa fa-2x fa-user-plus" aria-hidden="true"></i>
                                    </span> */}
                                        <span className="editIcon" title="EDIT"><i className="fa fa-2x fa-pencil-square-o" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    {/* {showPopup===true ? <PopupDialog /> : null} */}
                                </div>
                            );
                        })}
                    </div>
                </>}
            </div>
        </div >
    );
}

export default TemplateList;