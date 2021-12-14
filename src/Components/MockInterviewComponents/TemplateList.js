import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeTemplate, getTemplateList } from '../../Service/templateService';
import { deleteTemplateAction, saveAllTemplateFormsAction } from '../../redux/action/TemplateAction';

function TemplateList({ history }) {
    let templateForms = useSelector((state) => state.templateDetails.templateList);
    let dispatch = useDispatch();

    console.log(templateForms);
    let deleteTemplate = (index, _id) => {
        removeTemplate("delete-template-by-id", _id).then((result) => {
            if (
                result.status === true &&
                result.result.deletedCount === 1 &&
                result !== undefined
            ) {
                toast.success("Deleted a template successfully!");
                dispatch(deleteTemplateAction(index));
                history.push("/mock/template/list");
            } else toast.error("Unable to delete template");
        });
    };


    useEffect(() => {
        console.log(templateForms);
        getTemplateList("get-template-list").then((result) => {
            if (result === undefined) return false;
            dispatch(saveAllTemplateFormsAction(result.templateList));
        });
    }, []);

    return (
        <div className="content">
            <div className="formComponent">
                <h4 className="text-align-center">List of Templates</h4>
                <div className="parent_card flex flex-wrap">
                    {templateForms.map((template, index) => {
                        return (
                            <Link to={`/mock/template/detail/${template._id}`}>
                                <div
                                    className="card template_card flex flex-direction-column"
                                    key={index}
                                >

                                    <p className="batch_details" title="Template Title">
                                        {template.template_title}
                                    </p>

                                    <div className="questionSetCardContainer" title="Question Set">
                                        {template.questionSets.map((questionSet) => {
                                           return( <div className="questionSetCard">
                                                <p className="question_answer_details" title="Question">
                                                    {questionSet.question}
                                                </p>
                                                <p className="question_answer_details" title="Answer">
                                                    {questionSet.answer}
                                                </p>
                                            </div>)
                                        })
                                        }
                                    </div>

                                    <div className="form-buttons">
                                        <button onClick={() => deleteTemplate(index, template._id)}>
                                            DELETE
                                        </button>
                                        <button className="edit" onClick={() => {
                                            history.push("/mock/template/edit" + template._id);
                                        }}>
                                            EDIT
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div >
    );
}

export default TemplateList;