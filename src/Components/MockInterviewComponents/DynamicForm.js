import React, { useState } from "react";
import { Form, Formik, Field } from "formik";
import InputControl from "./../forms/InputControl";
import DynamicComponent from "./DynamicComponent";

function DynamicForm(props) {
  let templateTitle = {
    type: "text",
    name: "template_title",
    placeholder: "Untitled Template",
  };

  let dcField = [
    {
      type: "text",
      name:
        "question" +
        (new Date().valueOf() * Math.floor(Math.random() * 10) + 1).toString(),
      placeholder: "Question",
    },
    {
      type: "number",
      name:
        "answer" +
        (new Date().valueOf() * Math.floor(Math.random() * 10) + 1).toString(),
      placeholder: "Answer",
    },
    {
      type: "select",
      name: "select_component",
      options: [
        {
          label: "--Multiple Choice--",
          value: "",
        },
        {
          label: "TextBox",
          value: "text",
        },
        {
          label: "TextArea",
          value: "textarea",
        },
        {
          label: "Email",
          value: "email",
        },
        {
          label: "Number",
          value: "number",
        },
        {
          label: "Password",
          value: "password",
        },
      ],
    },
    {
      type: "text",
      name:
        "score_box" +
        (new Date().valueOf() * Math.floor(Math.random() * 10) + 1).toString(),
      placeholder: "Score",
    },
  ];

  let [formFields, setFormFields] = useState([
    [
      {
        type: "text",
        name:
          "question" +
          (
            new Date().valueOf() * Math.floor(Math.random() * 10) +
            1
          ).toString(),
        placeholder: "Question",
      },
      {
        type: "email",
        name:
          "answer" +
          (
            new Date().valueOf() * Math.floor(Math.random() * 10) +
            1
          ).toString(),
        placeholder: "Answer",
      },
      {
        type: "select",
        name: "select_component",
        options: [
          {
            label: "--Multiple Choice--",
            value: "",
          },
          {
            label: "TextBox",
            value: "text",
          },
          {
            label: "TextArea",
            value: "textarea",
          },
          {
            label: "Email",
            value: "email",
          },
          {
            label: "Number",
            value: "number",
          },
          {
            label: "Password",
            value: "password",
          },
        ],
      },
      {
        type: "text",
        name:
          "score_box" +
          (
            new Date().valueOf() * Math.floor(Math.random() * 10) +
            1
          ).toString(),
        placeholder: "Score",
      },
    ],
  ]);

  let [changeComponent, setChangeComponent] = useState("text");

  let initialValues = {
    question_1: "",
    multiple_choice: "text",
    select_component: "text",
  };

  let onSubmit = (values, onSubmitProps) => {
    console.log("dynamic");
    console.log(values);
    // props.history.push("/");
  };

  let addComponent = () => {
    console.log("adding component");

    setFormFields([...formFields]);
    formFields.push(dcField);
    setFormFields([...formFields]);
  };

  let removeComponent = (index) => {
    setFormFields([...formFields]);
    formFields.splice(index, 1);
    setFormFields([...formFields]);
  };

  let onchange = (event) => {
    console.log("onChange");
    setChangeComponent(event.target.value);
    // console.log(changeComponent);
  };

  return (
    <>
      <div className="outerComponent content formComponent">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validateOnChange={onchange}
        >
          <Form className="parentComponent">
            <div className="titleComponent">
              <InputControl {...templateTitle} />
            </div>

            <div className="dynamicComponent">
              {formFields.map((formField, index) => {
                // return <DynamicComponent key={index} {...formField} addComponent={addComponent} />
              })}
            </div>

            <div className="form-buttons">
              <button type="submit">EDIT</button>
              <button>SHARE</button>
              <button>REMOVE</button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default DynamicForm;
