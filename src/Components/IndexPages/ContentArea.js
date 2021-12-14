import React from "react";

function ContentArea() {
  return (
    <>
      <div className="content">
        <div className="formComponent">
          <div className="no_of_templates">You have 0 templates</div>
          <p>
            Do you want to <a href="/mock/template/new"> Create New Template?</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default ContentArea;
