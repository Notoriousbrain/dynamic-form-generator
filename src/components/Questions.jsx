import React, { useState } from "react";
import { IconClose, IconDelete } from "@arco-design/web-react/icon";

const Questions = ({
  field,
  index,
  formContent,
  setFormContent,
  isRequired,
  setIsRequired,
  setMaxChar,
  setMinChar,
  setChecked,
  checked
}) => {
  const [onEdit, setOnEdit] = useState(false);
  const [textField, setTextField] = useState("");
  const [editedField, setEditedField] = useState("");

  const deleteHandler = () => {
    const newformContent = [...formContent];
    newformContent.splice(index, 1);
    setFormContent(newformContent);
    console.log("Deleted");
  };

  const validationHandler = (fieldId) => {
    const formFields = [...formContent];
    const updatedFormFields = formFields.map((field) => {
      if (field.id === fieldId) {
        return {
          ...field,
          validation: !field.validation,
        };
      } else {
        return {
          ...field,
          validation: false,
        };
      }
    });
    setFormContent(updatedFormFields);
  };

  const questionHandler = (fieldId) => {
    const formFields = [...formContent];
    const updatedFormFields = formFields.map((field) => {
      if (field.id === fieldId) {
        return {
          ...field,
          isQuestionOpen: true,
          validation: false,
          addOption: true,
        };
      } else {
        return {
          ...field,
          isQuestionOpen: false,
          validation: false,
          addOption: false,
        };
      }
    });
    setFormContent(updatedFormFields);
  };

  const editField = (fieldName, fieldLabel) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].label = fieldLabel;
      setFormContent(formFields);
    }
  };

  const editFieldType = (fieldName, fieldLabel) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
    if (fieldIndex > -1) {
      formFields[fieldIndex].question_type = fieldLabel;
      setFormContent(formFields);
    }
  };

  const editRequired = (fieldName, value) => {
    setFormContent((prev) => {
      const updatedFormContent = [...prev];
      const fieldIndex = updatedFormContent.findIndex(
        (field) => field.name === fieldName
      );
      updatedFormContent[fieldIndex] = {
        ...updatedFormContent[fieldIndex],
        required: value,
      };
      setIsRequired(value); // update isRequired state
      return updatedFormContent;
    });
  };

  const addFieldOption = (fieldName, option) => {
    const formFields = [...formContent];
    const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
    if (fieldIndex > -1) {
      if (option && option !== "") {
        formFields[fieldIndex].list.push(option);
        setFormContent(formFields);
        setTextField("");
      }
    }
  };

  const updateCharLimits = (fieldName, property, value) => {
    setFormContent((prev) => {
      const updatedFormContent = [...prev];
      const fieldIndex = updatedFormContent.findIndex(
        (field) => field.name === fieldName
      );
      updatedFormContent[fieldIndex] = {
        ...updatedFormContent[fieldIndex],
        [property]: value,
      };
      return updatedFormContent;
    });
  };

  const handleRequiredToggle = () => {
    setChecked(!checked);
    setIsRequired(!isRequired);
  };

  const maxCharHandler = (e) => {
    setMaxChar(parseInt(e.target.value));
    updateCharLimits(formContent[0].name, "max_char", parseInt(e.target.value));
  };

  const minCharHandler = (e) => {
    setMinChar(parseInt(e.target.value));
    updateCharLimits(formContent[0].name, "min_char", parseInt(e.target.value));
  };

  return (
    <div
      key={field.name}
      className=" mt-3 shadow-md bg-white pt-6 pb-8 px-6 sm:px-4 rounded-xl "
    >
      <div onClick={() => questionHandler(field.id)}>
        <div
          // onClick={() => questionHandler(field.id)}
          className="flex justify-between sm:flex-col "
        >
          <div
            key={field.name}
            className="text-xl sm:text-lg font-medium text-gray-700 capitalize md:w-[75%] w-[85%] sm:w-full flex flex-wrap"
          >
            {onEdit && editedField === field.name ? (
              <input
                type="text"
                value={field.label}
                className="outline-none w-4/5 pb-1 border-b"
                onChange={(e) => editField(field.name, e.target.value)}
                onBlur={() => {
                  setOnEdit(false);
                  setEditedField("");
                }}
              />
            ) : (
              <label
                onClick={() => {
                  setOnEdit(true);
                  setEditedField(field.name);
                }}
              >
                {field.label}
              </label>
            )}
          </div>

          <div className="text-md sm:text-sm sm:mt-2">
            <select
              onChange={(e) => editFieldType(field.name, e.target.value)}
              className="outline-none border rounded-md py-1 pl-1"
              value={field.question_type}
            >
              <option value="short_answer">Short Answer</option>
              <option value="paragraph">Paragraph</option>
              <option value="dropdown">Drop Down</option>
              <option value="radio">Multi Choice</option>
              <option value="checkbox">Check Box</option>
            </select>
          </div>
        </div>

        <div
          // onClick={() => questionHandler(field.id)}
          className="my-4"
        >
          {field.question_type === "short_answer" && (
            <input
              type="text"
              className="h-10 block w-full outline-none shadow-sm"
              placeholder="Enter the answer here"
              disabled
            />
          )}
          {field.question_type === "paragraph" && (
            <textarea
              rows={4}
              className="h-8 block w-full outline-none shadow-sm"
              placeholder="Enter the answer here"
              disabled
            />
          )}
          {field.question_type === "dropdown" && (
            <div className="my-4 flex flex-col space-y-2">
              <select className="shadow-sm outline-none rounded-md flex flex-col w-full ">
                {field.list &&
                  field.list.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
              {field.addOption && (
                <div className="flex space-between">
                  <input
                    type="text"
                    onChange={(e) => setTextField(e.target.value)}
                    value={textField}
                    placeholder="Add an option"
                    className="flex-1 py-2 outline-none border-b"
                  />
                  <button
                    className="bg-blue-700 block text-white px-4 rounded-md"
                    onClick={() => addFieldOption(field.name, textField)}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          )}
          {field.question_type === "radio" && (
            <div className="my-4 flex flex-col space-y-2">
              <div className="shadow-sm outline-none rounded-md flex flex-col w-full">
                {field.list &&
                  field.list.map((item, i) => (
                    <label key={item}>
                      <input
                        type="radio"
                        key={i}
                        value={item}
                        className="mr-3"
                        disabled
                      />
                      {item}
                    </label>
                  ))}
              </div>

              {field.addOption && (
                <div className="w-full flex justify-between">
                  <input
                    type="text"
                    onChange={(e) => setTextField(e.target.value)}
                    value={textField}
                    placeholder="Add an option"
                    className="flex-1 outline-none border-b"
                  />
                  <button
                    onClick={() => addFieldOption(field.name, textField)}
                    className="bg-blue-700 text-white py-1 rounded-md px-4 ml-2"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          )}
          {field.question_type === "checkbox" && (
            <div className="my-4 flex flex-col space-y-2">
              <div className="shadow-sm outline-none rounded-md flex flex-col w-full">
                {field.list &&
                  field.list.map((item) => (
                    <label key={item}>
                      <input
                        type="checkbox"
                        key={item}
                        value={item}
                        className="mr-3"
                        disabled
                      />
                      {item}
                    </label>
                  ))}
              </div>

              {field.addOption && (
                <div className="w-full flex justify-between">
                  <input
                    type="text"
                    onChange={(e) => setTextField(e.target.value)}
                    value={textField}
                    placeholder="Add an option"
                    className="flex-1 outline-none border-b"
                  />
                  <button
                    onClick={() => addFieldOption(field.name, textField)}
                    className="bg-blue-700 text-white py-1 rounded-md px-4 ml-2"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {field.validation && (
        <div className="flex mb-4 ">
          <div className="flex w-full xs:flex-col">
            {" "}
            <input
              type="text"
              value={field.max_char}
              placeholder="Maximum Characters"
              className="outline-none pb-1 border-b w-1/4 md:w-1/3 sm:w-1/2 xs:w-full md:text-sm sm:text-xs"
              onChange={maxCharHandler}
            />
            <input
              type="text"
              value={field.min_char}
              placeholder="Minimum Characters"
              className="outline-none ml-4 mr-4 sm:mr-2 sm:ml-2 pb-1 border-b w-1/4 md:w-1/3 sm:w-1/2 xs:w-full xs:ml-0 xs:mt-3 md:text-sm sm:text-xs"
              onChange={minCharHandler}
            />
          </div>
          <div>
            <IconClose
              onClick={() => validationHandler(field.id)}
              className="w-6 sm:w-5"
              style={{
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      )}

      {field.isQuestionOpen && (
        <div className="flex justify-end">
          <IconDelete
            onClick={deleteHandler}
            className="w-6 sm:w-5"
            style={{
              cursor: "pointer",
            }}
          />
          <div className="flex items-center mr-2 ml-5 sm:ml-2 sm:mr-1 border-l border-gray-400 pl-5 pr-5 sm:pr-2 sm:pl-2 xs:pr-1 xs:pl-1">
            <p className="mr-4 font-semibold text-lg sm:text-base xs:text-sm">
              Required
            </p>
            <input
              type="checkbox"
              className="checkbox cursor-pointer hidden"
              id="checkbox"
              checked={checked}
              onChange={handleRequiredToggle}
              onClick={() => editRequired(field.name, !isRequired)}
            />
            <label
              htmlFor="checkbox"
              className={`flex items-center justify-center w-10 h-3 sm:w-8 sm:h-2 xs:w-5 xs:h-1 rounded-full p-1 relative label ${
                field.required ? "bg-blue-400" : "bg-gray-400"
              } `}
            >
              <div
                className={`w-5 h-5 sm:w-4 sm:h-4 xs:w-3 xs:h-3 bg-white shadow-black shadow-md rounded-full transition duration-300 transform ${
                  field.required ? "translate-x-3" : "-translate-x-3"
                }`}
              />
            </label>
          </div>

          <button
            onClick={() => validationHandler(field.id)}
            className="font-semibold text-lg sm:text-base xs:text-sm border px-2 py-1 sm:px-1 rounded-lg"
          >
            Condition
          </button>
        </div>
      )}
    </div>
  );
};

export default Questions;
