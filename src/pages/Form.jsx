import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Questions from "../components/Questions";


const Form = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state;
  const [isRequired, setIsRequired] = useState(false);
  const [maxChar, setMaxChar] = useState();
  const [minChar, setMinChar] = useState();
  const [onTitleEdit, setOnTitleEdit] = useState(false);
  const [onDescEdit, setOnDescEdit] = useState(false);
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDesc, setFormDesc] = useState("Untitled Description");
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
      isQuestionOpen: false,
      validation: false,
      addOption: false,
      list: [],
    },
  ]);

    useEffect(() => {
        !checked ? setIsRequired(true) : setIsRequired(false)
    },[checked])

  const addQuestions = () => {
    const field = {
      id: `${formContent.length}`,
      name: `question_${formContent.length}`,
      label: "Untitled question",
      required: false,
      question_type: "short_answer",
      isQuestionOpen: false,
      validation: false,
      addOption: false,
      list: [],
    };
    setFormContent([...formContent, field]);
  };

  // Send data to Firebase
function formData() {
  console.log("Success")
  const cleanFormContent = formContent.map((field) => ({
    ...field,
    isQuestionOpen: false,
    validation: false,
    addOption: false,
  }));
  const data = {
    formContent: cleanFormContent,
    formTitle,
    formDesc,
    id,
  };
  console.log(data);
   axios
     .post(
       "https://form-builder-53ce7-default-rtdb.asia-southeast1.firebasedatabase.app/forms.json",
       data
     )
     .then((response) => {
       console.log(
         "Form data has been successfully submitted to Firebase!",
         response
       );
     })
     .then(
      setTimeout(() => {
        navigate('/')
      },1000)
     )
     .catch((error) => {
       console.error("Error submitting form data to Firebase:", error);
     });
}

  return (
    <div className="flex justify-center py-8">
      <div className="w-4/5 flex flex-col mt-16">
        <div className="flex flex-col bg-white pt-6 pb-8 px-6 rounded-xl shadow-md">
          {onTitleEdit ? (
            <input
              type="text"
              value={formTitle}
              className="outline-none border-b text-3xl pb-3 text-black/60 mb-2 sm:text-2xl sm:pb-1"
              onChange={(e) => setFormTitle(e.target.value)}
              onBlur={() => {
                setOnTitleEdit(false);
              }}
            />
          ) : (
            <label
              className="text-3xl sm:text-2xl font-semibold text-black/80 sm:mb-0 mb-2"
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
              className="outline-none border-b text-xl sm:text-lg pb-3 text-black/60"
              onChange={(e) => setFormDesc(e.target.value)}
              onBlur={() => {
                setOnDescEdit(false);
              }}
            />
          ) : (
            <label
              className="text-xl sm:text-lg font-medium text-black/80"
              onClick={() => {
                setOnDescEdit(true);
              }}
            >
              {formDesc}
            </label>
          )}
        </div>

        <div className="relative flex flex-col w-full space-y-4 mt-6">
          {formContent &&
            formContent.map((field, index) => {

              return (
                <Questions
                  field={field}
                  index={index}
                  formContent={formContent}
                  setFormContent={setFormContent}
                  isRequired={isRequired}
                  setIsRequired={setIsRequired}
                  setMaxChar={setMaxChar}
                  setMinChar={setMinChar}
                  setChecked={setChecked}
                  checked={checked}
                />
              );
            })}

          <div className=" mt-3 flex justify-between xs:flex-col">
            <button
              onClick={addQuestions}
              className=" shadow-xl py-3 rounded-lg px-6 bg-blue-700 text-white text-lg font-semibold xs:text-sm xs:px-2 sm:text-base sm:px-4 xs:mb-2"
            >
              Add a Question
            </button>
            <input
              className=" shadow-xl py-3 rounded-lg px-6 bg-blue-700 text-white text-lg font-semibold xs:text-sm xs:px-2 sm:text-base sm:px-4 xs:mb-2"
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