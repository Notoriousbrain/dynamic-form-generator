import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormCard = ({
  cardKey,
  id,
  formKey,
  formContent,
  title,
  description,
}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState("");

  const formHandler = () => {
    navigate(`/submit/${id}`, {
      state: { id, title, description, form, formContent },
    });
  };

  const editHandler = () => {
    navigate(`/edit/form/${id}`, {
      state: { cardKey, id, title, formKey, description, form, formContent },
    });
  };

   useEffect(() => {
     const fetchFormCard = async () => {
       try {
         const { data } = await axios.get(
           "https://form-builder-53ce7-default-rtdb.asia-southeast1.firebasedatabase.app/forms.json"
         );
         if (data) {
           setForm(Object.values(data));
         } else {
           console.error("Error: No data returned from server");
         }
       } catch (error) {
         console.error(error);
       }
     };
     fetchFormCard();
   }, []);


  return (
    <>
      {form && (
        <div className="border rounded-sm w-[23%] md:w-[31%] sm:w-[46%] xs:w-full py-3 px-5 md:py-2 md:px-2 flex flex-col ">
          <div className="text-2xl md:text-xl h-10 md:h-8 sm:text-lg font-semibold text-black/80 overflow-hidden">
            {title}
          </div>
          <div className="font-semibold text-lg h-10 overflow-hidden md:text-base sm:text-sm mt-1 flex-wrap">{description}</div>
          <div className="flex justify-between mt-2 gap-2 ">
            <button className="py-1 px-4 md:px-2 bg-blue-700 text-white rounded-md font-medium" onClick={editHandler}>
              Edit
            </button>
            <button className="py-1 px-4 md:px-2 bg-blue-700 text-white rounded-md font-medium" onClick={formHandler}>
              Preview
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormCard;
