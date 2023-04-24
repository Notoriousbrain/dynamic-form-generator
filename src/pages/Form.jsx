import React, { useEffect, useState } from "react";
import { IconClose, IconDelete } from "@arco-design/web-react/icon";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Questions from "../components/Questions";


const Form = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = state;
  // const [onEdit, setOnEdit] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [maxChar, setMaxChar] = useState();
  const [minChar, setMinChar] = useState();
  const [onTitleEdit, setOnTitleEdit] = useState(false);
  const [onDescEdit, setOnDescEdit] = useState(false);
  // const [textField, setTextField] = useState("");
  // const [editedField, setEditedField] = useState("");
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

  // const editField = (fieldName, fieldLabel) => {
  //   const formFields = [...formContent];
  //   const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
  //   if (fieldIndex > -1) {
  //     formFields[fieldIndex].label = fieldLabel;
  //     setFormContent(formFields);
  //   }
  // };

  // const editFieldType = (fieldName, fieldLabel) => {
  //   const formFields = [...formContent];
  //   const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
  //   if (fieldIndex > -1) {
  //     formFields[fieldIndex].question_type = fieldLabel;
  //     setFormContent(formFields);
  //   }
  // };

// const editRequired = (fieldName, value) => {
//   setFormContent((prev) => {
//     const updatedFormContent = [...prev];
//     const fieldIndex = updatedFormContent.findIndex(
//       (field) => field.name === fieldName
//     );
//     updatedFormContent[fieldIndex] = {
//       ...updatedFormContent[fieldIndex],
//       required: value,
//     };
//     setIsRequired(value); // update isRequired state
//     return updatedFormContent;
//   });
// };


//   const addFieldOption = (fieldName, option) => {
//     const formFields = [...formContent];
//     const fieldIndex = formFields.findIndex((f) => f.name === fieldName);
//     if (fieldIndex > -1) {
//       if (option && option !== "") {
//         formFields[fieldIndex].list.push(option);
//         setFormContent(formFields);
//         setTextField("");
//       }
//     }
//   };

//     const updateCharLimits = (fieldName, property, value) => {
//       setFormContent((prev) => {
//         const updatedFormContent = [...prev];
//         const fieldIndex = updatedFormContent.findIndex(
//           (field) => field.name === fieldName
//         );
//         updatedFormContent[fieldIndex] = {
//           ...updatedFormContent[fieldIndex],
//           [property]: value,
//         };
//         return updatedFormContent;
//       });
//     };

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
       navigate('/')
     )
     .catch((error) => {
       console.error("Error submitting form data to Firebase:", error);
     });
}

  // const handleRequiredToggle = () => {
  //   setChecked(!checked);
  //   setIsRequired(!isRequired);
  // };

  // const maxCharHandler = (e) => {
  //   setMaxChar(parseInt(e.target.value));
  //   updateCharLimits(formContent[0].name, "max_char", parseInt(e.target.value));
  // };

  // const minCharHandler = (e) => {
  //   setMinChar(parseInt(e.target.value));
  //   updateCharLimits(formContent[0].name, "min_char", parseInt(e.target.value));
  // };

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
              // const deleteHandler = () => {
              //   const newformContent = [...formContent];
              //   newformContent.splice(index, 1);
              //   setFormContent(newformContent);
              //   console.log("Deleted");
              // };

              // const validationHandler = (fieldId) => {
              //   const formFields = [...formContent];
              //   const updatedFormFields = formFields.map((field) => {
              //     if (field.id === fieldId) {
              //       return {
              //         ...field,
              //         validation: !field.validation,
              //       };
              //     } else {
              //       return {
              //         ...field,
              //         validation: false,
              //       };
              //     }
              //   });
              //   setFormContent(updatedFormFields);
              // };

              // const questionHandler = (fieldId) => {
              //   const formFields = [...formContent];
              //   const updatedFormFields = formFields.map((field) => {
              //     if (field.id === fieldId) {
              //       return {
              //         ...field,
              //         isQuestionOpen: true,
              //         validation: false,
              //         addOption: true
              //       };
              //     } else {
              //       return {
              //         ...field,
              //         isQuestionOpen: false,
              //         validation: false,
              //         addOption: false
              //       };
              //     }
              //   });
              //   setFormContent(updatedFormFields);
              // };


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
                // <div
                //   key={field.name}
                //   className=" mt-3 shadow-md bg-white pt-6 pb-8 px-6 sm:px-4 rounded-xl "
                // >
                //   <div onClick={() => questionHandler(field.id)}>
                //     <div
                //       // onClick={() => questionHandler(field.id)}
                //       className="flex justify-between sm:flex-col "
                //     >
                //       <div
                //         key={field.name}
                //         className="text-xl sm:text-lg font-medium text-gray-700 capitalize md:w-[75%] w-[85%] sm:w-full flex flex-wrap"
                //       >
                //         {onEdit && editedField === field.name ? (
                //           <input
                //             type="text"
                //             value={field.label}
                //             className="outline-none w-4/5 pb-1 border-b"
                //             onChange={(e) =>
                //               editField(field.name, e.target.value)
                //             }
                //             onBlur={() => {
                //               setOnEdit(false);
                //               setEditedField("");
                //             }}
                //           />
                //         ) : (
                //           <label
                //             onClick={() => {
                //               setOnEdit(true);
                //               setEditedField(field.name);
                //             }}
                //           >
                //             {field.label}
                //           </label>
                //         )}
                //       </div>

                //       <div className="text-md sm:text-sm sm:mt-2">
                //         <select
                //           onChange={(e) =>
                //             editFieldType(field.name, e.target.value)
                //           }
                //           className="outline-none border rounded-md py-1 pl-1"
                //           value={field.question_type}
                //         >
                //           <option value="short_answer">Short Answer</option>
                //           <option value="paragraph">Paragraph</option>
                //           <option value="dropdown">Drop Down</option>
                //           <option value="radio">Multi Choice</option>
                //           <option value="checkbox">Check Box</option>
                //         </select>
                //       </div>
                //     </div>

                //     <div
                //       // onClick={() => questionHandler(field.id)}
                //       className="my-4"
                //     >
                //       {field.question_type === "short_answer" && (
                //         <input
                //           type="text"
                //           className="h-10 block w-full outline-none shadow-sm"
                //           placeholder="Enter the answer here"
                //           disabled
                //         />
                //       )}
                //       {field.question_type === "paragraph" && (
                //         <textarea
                //           rows={4}
                //           className="h-8 block w-full outline-none shadow-sm"
                //           placeholder="Enter the answer here"
                //           disabled
                //         />
                //       )}
                //       {field.question_type === "dropdown" && (
                //         <div className="my-4 flex flex-col space-y-2">
                //           <select className="shadow-sm outline-none rounded-md flex flex-col w-full ">
                //             { field.list && field.list.map((item) => (
                //               <option key={item} value={item}>
                //                 {item}
                //               </option>
                //             ))}
                //           </select>
                //           {field.addOption && (
                //             <div className="flex space-between">
                //               <input
                //                 type="text"
                //                 onChange={(e) => setTextField(e.target.value)}
                //                 value={textField}
                //                 placeholder="Add an option"
                //                 className="flex-1 py-2 outline-none border-b"
                //               />
                //               <button
                //                 className="bg-blue-700 block text-white px-4 rounded-md"
                //                 onClick={() =>
                //                   addFieldOption(field.name, textField)
                //                 }
                //               >
                //                 Add
                //               </button>
                //             </div>
                //           )}
                //         </div>
                //       )}
                //       {field.question_type === "radio" && (
                //         <div className="my-4 flex flex-col space-y-2">
                //           <div className="shadow-sm outline-none rounded-md flex flex-col w-full">
                //             {field.list &&
                //               field.list.map((item, i) => (
                //                 <label key={item}>
                //                   <input
                //                     type="radio"
                //                     key={i}
                //                     value={item}
                //                     className="mr-3"
                //                     disabled
                //                   />
                //                   {item}
                //                 </label>
                //               ))}
                //           </div>

                //           {field.addOption && (
                //             <div className="w-full flex justify-between">
                //               <input
                //                 type="text"
                //                 onChange={(e) => setTextField(e.target.value)}
                //                 value={textField}
                //                 placeholder="Add an option"
                //                 className="flex-1 outline-none border-b"
                //               />
                //               <button
                //                 onClick={() =>
                //                   addFieldOption(field.name, textField)
                //                 }
                //                 className="bg-blue-700 text-white py-1 rounded-md px-4 ml-2"
                //               >
                //                 Add
                //               </button>
                //             </div>
                //           )}
                //         </div>
                //       )}
                //       {field.question_type === "checkbox" && (
                //         <div className="my-4 flex flex-col space-y-2">
                //           <div className="shadow-sm outline-none rounded-md flex flex-col w-full">
                //             {field.list &&
                //               field.list.map((item) => (
                //                 <label key={item}>
                //                   <input
                //                     type="checkbox"
                //                     key={item}
                //                     value={item}
                //                     className="mr-3"
                //                     disabled
                //                   />
                //                   {item}
                //                 </label>
                //               ))}
                //           </div>

                //           {field.addOption && (
                //             <div className="w-full flex justify-between">
                //               <input
                //                 type="text"
                //                 onChange={(e) => setTextField(e.target.value)}
                //                 value={textField}
                //                 placeholder="Add an option"
                //                 className="flex-1 outline-none border-b"
                //               />
                //               <button
                //                 onClick={() =>
                //                   addFieldOption(field.name, textField)
                //                 }
                //                 className="bg-blue-700 text-white py-1 rounded-md px-4 ml-2"
                //               >
                //                 Add
                //               </button>
                //             </div>
                //           )}
                //         </div>
                //       )}
                //     </div>
                //   </div>

                //   {field.validation && (
                //     <div className="flex mb-4 ">
                //       <div className="flex w-full xs:flex-col">
                //         {" "}
                //         <input
                //           type="text"
                //           value={field.max_char}
                //           placeholder="Maximum Characters"
                //           className="outline-none pb-1 border-b w-1/4 md:w-1/3 sm:w-1/2 xs:w-full md:text-sm sm:text-xs"
                //           onChange={maxCharHandler}
                //         />
                //         <input
                //           type="text"
                //           value={field.min_char}
                //           placeholder="Minimum Characters"
                //           className="outline-none ml-4 mr-4 sm:mr-2 sm:ml-2 pb-1 border-b w-1/4 md:w-1/3 sm:w-1/2 xs:w-full xs:ml-0 xs:mt-3 md:text-sm sm:text-xs"
                //           onChange={minCharHandler}
                //         />
                //       </div>
                //       <div>
                //         <IconClose
                //           onClick={() => validationHandler(field.id)}
                //           className="w-6 sm:w-5"
                //           style={{
                //             cursor: "pointer",
                //           }}
                //         />
                //       </div>
                //     </div>
                //   )}

                //   {field.isQuestionOpen && (
                //     <div className="flex justify-end">
                //       <IconDelete
                //         onClick={deleteHandler}
                //         className="w-6 sm:w-5"
                //         style={{
                //           cursor: "pointer",
                //         }}
                //       />
                //       <div className="flex items-center mr-2 ml-5 sm:ml-2 sm:mr-1 border-l border-gray-400 pl-5 pr-5 sm:pr-2 sm:pl-2 xs:pr-1 xs:pl-1">
                //         <p className="mr-4 font-semibold text-lg sm:text-base xs:text-sm">
                //           Required
                //         </p>
                //         <input
                //           type="checkbox"
                //           className="checkbox cursor-pointer hidden"
                //           id="checkbox"
                //           checked={checked}
                //           onChange={handleRequiredToggle}
                //           onClick={() => editRequired(field.name, !isRequired)}
                //         />
                //         <label
                //           htmlFor="checkbox"
                //           className={`flex items-center justify-center w-10 h-3 sm:w-8 sm:h-2 xs:w-5 xs:h-1 rounded-full p-1 relative label ${
                //             field.required ? "bg-blue-400" : "bg-gray-400"
                //           } `}
                //         >
                //           <div
                //             className={`w-5 h-5 sm:w-4 sm:h-4 xs:w-3 xs:h-3 bg-white shadow-black shadow-md rounded-full transition duration-300 transform ${
                //               field.required
                //                 ? "translate-x-3"
                //                 : "-translate-x-3"
                //             }`}
                //           />
                //         </label>
                //       </div>

                //       <button
                //         onClick={() => validationHandler(field.id)}
                //         className="font-semibold text-lg sm:text-base xs:text-sm border px-2 py-1 sm:px-1 rounded-lg"
                //       >
                //         Condition
                //       </button>
                //     </div>
                //   )}
                // </div>
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