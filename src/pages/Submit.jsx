import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const camelize = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

const Submit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { title, description, formContent } = state;
 

 const submitForm = (e) => {
   e.preventDefault();

   //loop through our questions & get values based on the element name
   const formTargets = e.target;
   let data = [];
   formContent.map((content, i) => {
     const element = camelize(content.label);
     const newItem = {
       key: i,
       question: content.label,
       answer: formTargets[element].value,
     };
     return data.push(newItem);
   });

   // Post request to Firebase
   axios
     .post(
       "https://form-builder-53ce7-default-rtdb.asia-southeast1.firebasedatabase.app/answers.json",
       data
     )
     .then((response) => {
       console.log(
         "Form data has been successfully submitted to Firebase!",
         response
       );
     }).then(
      navigate('/')
     )
     .catch((error) => {
       console.error("Error submitting form data to Firebase:", error);
     });
 };


  return (
    <form
      onSubmit={submitForm}
    >
      <div className="flex justify-center py-8">
        <div className="w-4/5 flex flex-col mt-16">
          <div className="flex flex-col bg-white pt-6 pb-8 px-6  rounded-xl shadow-md">
          <h1 className="text-3xl text-black/80 mb-2">{title}</h1>
          <p className="text-xl text-black/80">{description}</p>
        </div>
      {formContent && formContent.map((field) => {
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
                <label>{field.label}</label>
              </div>
            </div>

            <div className="my-4">
              {field.question_type === "short_answer" && (
                <input
                  type="text"
                  className="h-10 block w-full outline-none shadow-sm"
                  placeholder={field.label}
                  name={camelize(field.label)}
                />
              )}
              {field.question_type === "paragraph" && (
                <textarea
                  rows={4}
                  className="h-8 block w-full outline-none shadow-sm"
                  placeholder={field.label}
                  name={camelize(field.label)}
                />
              )}
              {field.question_type === "dropdown" && (
                <select
                  name={camelize(field.label)}
                 className="shadow-sm outline-none rounded-md flex flex-col w-full "
                >
                  {field.list.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              )}
              {field.question_type === "radio" && (
                <div className="my-4 flex flex-col space-y-2">
                  <div className="shadow-sm outline-none rounded-md flex flex-col w-full">
                    {field.list.map((item) => (
                      <label>
                        <input
                          name={camelize(field.label)}
                          type="radio"
                          key={item}
                          value={item}
                          className="mr-3 mb-3"
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {field.question_type === "checkbox" && (
                <div className="my-4 flex flex-col space-y-2">
                  <div className="shadow-sm outline-none rounded-md flex flex-col w-full">
                    {field.list.map((item) => (
                      <label>
                        <input
                          name={camelize(field.label)}
                          type="checkbox"
                          key={item}
                          value={item}
                          className="mr-3"
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="flex justify-end mt-3 w-full ">
        <button
          type="submit"
          className="bg-blue-700 py-2 text-white rounded-md w-32 text-lg"
        >
          Submit
        </button>
      </div>
      </div>
      </div>
    </form>
  );
};

export default Submit;