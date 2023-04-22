import React, { useEffect, useState, useRef } from "react";
import { IconClose, IconDelete, IconMoreVertical } from "@arco-design/web-react/icon";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useLocation, useNavigate } from "react-router-dom";


const Form = () => {
  // const TextArea = Input.TextArea;
  // const Label = Input.Label;
  const modalRef = useRef();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state;
  const [onEdit, setOnEdit] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [validation, setValidation] = useState(false);
  const [maxChar, setMaxChar] = useState(200);
  const [minChar, setMinChar] = useState(0);
  const [onTitleEdit, setOnTitleEdit] = useState(false);
  const [onDescEdit, setOnDescEdit] = useState(false);
  const [textField, setTextField] = useState("");
  const [editedField, setEditedField] = useState("");
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDesc, setFormDesc] = useState("Untitled Description");
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [formContent, setFormContent] = useState([
    {
      id: 0,
      name: "question_0",
      label: "Untitled Question",
      required: false,
      max_char: maxChar,
      min_char: minChar,
      question_type: "short_answer",
      list: [],
    },
  ]);


    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleOutsideClick);
      }

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [isOpen]);

    useEffect(() => {
        !checked ? setIsRequired(true) : setIsRequired(false)
    },[checked])

  const firebaseConfig = {
    apiKey: "AIzaSyCSb_eSQQJk7o_12aHRNI8sla15xrRdEb8",
    authDomain: "form-builder-53ce7.firebaseapp.com",
    databaseURL:
      "https://form-builder-53ce7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "form-builder-53ce7",
    storageBucket: "form-builder-53ce7.appspot.com",
    messagingSenderId: "855188196860",
    appId: "1:855188196860:web:28a602f317642cd22af679",
    measurementId: "G-5B7WCEG8XZ",
  };
firebase.initializeApp(firebaseConfig);

  const addQuestions = () => {
    const field = {
      name: `question_${formContent.length}`,
      label: "Untitled question",
      required: false,
      question_type: "short_answer",
      list: [],
    };
    setFormContent([...formContent, field]);
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

  // // Get a reference to the database service
  // const database = firebase.database();

  // Send data to Firebase
function formData() {
  console.log("Success")
  const data = {
    formContent,
    formTitle,
    formDesc,
    id,
  };
  console.log(data);
  navigate('/');
  const newPostKey = firebase.database().ref().child("forms").push().key;
  const updates = {};
  updates["/forms/" + newPostKey] = data;
  return firebase.database().ref().update(updates);
}

const conditionHandler = () => {
  setIsOpen((prev) => !prev);
};

const handleToggle = () => {
    setChecked(!checked);
    setIsRequired(!isRequired);
};

const validationHandler = () => {
  setIsOpen((prev) => !prev);
  setValidation(true);
}

const closeConditionHandler = () => {
  setValidation(false);
};

  const maxCharHandler = (e) => {
    setMaxChar(parseInt(e.target.value));
    updateCharLimits(
      formContent[0].name,
      "max_char",
      parseInt(e.target.value)
    );
  };

  const minCharHandler = (e) => {
    setMinChar(parseInt(e.target.value));
    updateCharLimits(
      formContent[0].name,
      "min_char",
      parseInt(e.target.value)
    );
  };

  return (
    <div className="flex justify-center py-8">
      <div className="w-4/5 flex flex-col mt-16">
        <div className="flex flex-col bg-white pt-6 pb-8 px-6  rounded-xl shadow-md">
          {onTitleEdit ? (
            <input
              type="text"
              value={formTitle}
              className="outline-none border-b text-3xl pb-3 text-black/60 mb-2"
              onChange={(e) => setFormTitle(e.target.value)}
              onBlur={() => {
                setOnTitleEdit(false);
              }}
            />
          ) : (
            <label
              className="text-3xl text-black/80 mb-2"
              onClick={() => {
                setOnTitleEdit(true);
              }}
            >
              {formTitle}
            </label>
          )}
          {onDescEdit ? (
            <input
              type="text"
              value={formDesc}
              className="outline-none border-b text-xl pb-3 text-black/60"
              onChange={(e) => setFormDesc(e.target.value)}
              onBlur={() => {
                setOnDescEdit(false);
              }}
            />
          ) : (
            <label
              className="text-xl text-black/80"
              onClick={() => {
                setOnDescEdit(true);
              }}
            >
              {formDesc}
            </label>
          )}
        </div>

        <div className="relative flex flex-col w-full space-y-4 mt-6">
          {formContent.map((field, index) => {
            const deleteHandler = () => {
              const newFormContent = [...formContent];
              newFormContent.splice(index, 1);
              setFormContent(newFormContent);
              console.log("Deleted");
            };
            return (
              <div
                key={field.name}
                className=" mt-3 shadow-md bg-white pt-6 pb-8 px-6 rounded-xl "
              >
                <div className="flex justify-between items-center">
                  <div
                    key={field.name}
                    className="text-lg font-medium text-gray-700 capitalize w-full"
                  >
                    {onEdit && editedField === field.name ? (
                      <input
                        type="text"
                        value={field.label}
                        placeholder="Enter the Question"
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

                  <div className="w-[17%]">
                    <select
                      onChange={(e) =>
                        editFieldType(field.name, e.target.value)
                      }
                      className="outline-none border rounded-md text-md py-1 pl-1 w-full  "
                    >
                      <option value="short_answer">Short Answer</option>
                      <option value="paragraph">Paragraph</option>
                      <option value="dropdown">Drop Down</option>
                      <option value="radio">Multi Choice</option>
                      <option value="checkbox">Check Box</option>
                    </select>
                  </div>
                </div>

                <div className="my-4">
                  {field.question_type === "short_answer" && (
                    <input
                      type="text"
                      className="h-10 block w-full outline-none shadow-sm bg-white"
                      placeholder="Enter the answer here"
                      disabled
                    />
                  )}
                  {field.question_type === "paragraph" && (
                    <textarea
                      rows={4}
                      className="h-8 block w-full outline-none shadow-sm bg-white"
                      placeholder="Enter the answer here"
                      disabled
                    />
                  )}
                  {field.question_type === "dropdown" && (
                    <div className="my-4 flex flex-col space-y-2">
                      <select className="shadow-sm outline-none rounded-md flex flex-col w-full ">
                        {field.list.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <div className="flex space-between">
                        <input
                          type="text"
                          onChange={(e) => setTextField(e.target.value)}
                          value={textField}
                          placeholder="Add an option"
                          className="flex-1 py-2 outline-none border-b bg-white"
                        />
                        <button
                          className="bg-blue-700 block text-white px-4 rounded-md"
                          onClick={() => addFieldOption(field.name, textField)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                  {field.question_type === "radio" && (
                    <div className="my-4 flex flex-col space-y-2">
                      <div className="shadow-sm outline-none rounded-md flex flex-col w-full">
                        {field.list.map((item) => (
                          <label key={item}>
                            <input
                              type="radio"
                              key={item}
                              value={item}
                              className="mr-3"
                              disabled
                            />
                            {item}
                          </label>
                        ))}
                      </div>

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
                    </div>
                  )}
                  {field.question_type === "checkbox" && (
                    <div className="my-4 flex flex-col space-y-2">
                      <div className="shadow-sm outline-none rounded-md flex flex-col w-full">
                        {field.list.map((item) => (
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
                    </div>
                  )}
                </div>

                {validation && (
                  <div className="flex  mb-4">
                    <div className="flex">
                      {" "}
                      <input
                        type="text"
                        placeholder="Maximum Characters"
                        className="outline-none pb-1 border-b"
                        onChange={maxCharHandler}
                      />
                      <input
                        type="text"
                        placeholder="Minimum Characters"
                        className="outline-none ml-4 mr-4 pb-1 border-b"
                        onChange={minCharHandler}
                      />
                    </div>
                    <div>
                      <IconClose
                        onClick={closeConditionHandler}
                        style={{
                          width: 24,
                          marginRight: 20,
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                )}

                {isOpen && (
                  <div
                    ref={modalRef}
                    onClick={validationHandler}
                    className="flex justify-end "
                  >
                    <p className=" cursor-pointer font-medium border py-2 px-3 absolute bottom-36 bg-white">
                      {" "}
                      Response Validation{" "}
                    </p>
                  </div>
                )}

                <div className="flex justify-end">
                  <IconDelete
                    onClick={deleteHandler}
                    style={{ width: 24, marginRight: 20, cursor: "pointer" }}
                  />
                  <div className="flex items-center mr-2 border-l border-gray-400 pl-5">
                    <p className="mr-4 font-semibold text-lg">Required</p>
                    <input
                      type="checkbox"
                      className="checkbox cursor-pointer hidden"
                      id="checkbox"
                      checked={checked}
                      onChange={handleToggle}
                      onClick={() => editRequired(field.name, !field.required)}
                    />
                    <label
                      htmlFor="checkbox"
                      className={`flex items-center justify-center w-10 h-3 rounded-full p-1 relative label ${
                        checked ? "bg-blue-400" : "bg-gray-400"
                      } `}
                    >
                      <div
                        className={`w-5 h-5 bg-white shadow-black shadow-md rounded-full transition duration-300 transform ${
                          checked ? "translate-x-3" : "-translate-x-3"
                        }`}
                      />
                    </label>
                  </div>

                  <IconMoreVertical
                    onClick={conditionHandler}
                    style={{ width: 24, marginRight: 20, cursor: "pointer" }}
                  />
                </div>
              </div>
            );
          })}

          <div className=" mt-3 flex justify-between">
            <button
              onClick={addQuestions}
              className=" shadow-xl py-3 rounded-lg w-1/5 bg-blue-700 text-white text-lg font-semibold"
            >
              Add a Question
            </button>
            <input
              className=" shadow-xl py-3 rounded-lg w-1/5 bg-blue-700 text-white text-lg font-semibold"
              type="submit"
              value="Save"
              onClick={formData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;