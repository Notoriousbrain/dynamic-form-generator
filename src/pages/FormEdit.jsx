import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Questions from "../components/Questions";

const FormEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, title, formKey, description } = state;
  const [isRequired, setIsRequired] = useState(false);
  const [maxChar, setMaxChar] = useState();
  const [minChar, setMinChar] = useState();
  const [onTitleEdit, setOnTitleEdit] = useState(false);
  const [onDescEdit, setOnDescEdit] = useState(false);
  const [formTitle, setFormTitle] = useState(title);
  const [formDesc, setFormDesc] = useState(description);
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
    const fetchFormDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://form-builder-53ce7-default-rtdb.asia-southeast1.firebasedatabase.app/forms/${formKey}.json`
        );
        if (data) {
          setFormContent(Object.values(data)[0]);
          console.log(formContent);
        } else {
          console.error("Error: No data returned from server");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchFormDetails();
  }, []);

  useEffect(() => {
    !checked ? setIsRequired(true) : setIsRequired(false);
  }, [checked]);

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

  const updateData = async (dataId, newData) => {
    return axios
      .put(
        `https://form-builder-53ce7-default-rtdb.asia-southeast1.firebasedatabase.app/forms/${dataId}.json`,
        newData
      )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .then(navigate(`/`))
      .catch((error) => console.error(error));
  };

   const cleanFormContent = formContent.map((field) => ({
    ...field,
    isQuestionOpen: false,
    validation: false,
    addOption: false,
  }));

  const newData = {
    formContent: cleanFormContent,
    formTitle,
    formDesc,
    id,
  };

  const baseUrl =
    "https://form-builder-53ce7-default-rtdb.asia-southeast1.firebasedatabase.app";
  const formsCollection = "forms";
  const documentId = formKey;

   const deleteHandler = () => {
     axios
       .delete(`${baseUrl}/${formsCollection}/${documentId}.json`)
       .then((response) => {
         console.log("Document deleted successfully", response);
       })
       .then(navigate("/"))
       .then(console.log("Form deleted successfully"))
       .catch((error) => {
         console.error("Error deleting document", error);
       });
   };


  return (
    <div className="flex justify-center py-8">
      <div className="w-4/5 sm:w-11/12 flex flex-col mt-16">
        <div className="flex flex-col bg-white pt-6 pb-8 px-6 rounded-xl shadow-md">
          {onTitleEdit ? (
            <input
              type="text"
              value={formTitle}
              className="outline-none border-b text-3xl sm:text-2xl sm:pb-1 pb-3 text-black/60 mb-2"
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
              className=" shadow-xl py-3 rounded-lg px-6 bg-blue-700 text-white text-lg xs:text-sm xs:px-2 sm:text-base sm:px-4 xs:mb-2 font-semibold"
            >
              Add a Question
            </button>
            <button
              onClick={deleteHandler} 
              className=" shadow-xl py-3 rounded-lg px-6 bg-blue-700 text-white text-lg xs:text-sm xs:px-2 sm:text-base sm:px-4 xs:mb-2 font-semibold"  
            >
              Delete
            </button>
            <input
              className=" shadow-xl py-3 rounded-lg px-6 bg-blue-700 text-white text-lg xs:text-sm xs:px-2 sm:text-base sm:px-4 xs:mb-2 font-semibold"
              type="submit"
              value="Save"
              onClick={() => updateData(formKey, newData)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEdit;
