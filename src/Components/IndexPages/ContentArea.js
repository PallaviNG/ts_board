import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { saveAllTemplateFormsAction } from "../../redux/action/TemplateAction";
import { getTemplateList } from './../../Service/templateService';
import { Link } from 'react-router-dom';

function ContentArea() {
  let templateForms = useSelector((state) => state.templateDetails.templateList);
  let dispatch = useDispatch();

  let [templateCount, setTemplateCount] = useState(0);

  useEffect(() => {

    getTemplateList("get-template-list").then((result) => {
      if (result === undefined) return false;
      dispatch(saveAllTemplateFormsAction(result.templateList));
    });
    setTemplateCount(templateForms.length);
  }, [templateForms]);

  return (
    <>
      <div className="content">
        <div className="formComponent">
          <div>You have {templateCount}
            <Link to="/mock/template/list"> templates</Link>
          </div>
          <p  className="no_of_templates">
            Do you want to <a href="/mock/template/new"> Create New Template?</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default ContentArea;
