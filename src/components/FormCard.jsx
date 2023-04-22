import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const FormCard = ({ cardKey, id, formKey, formContent, form, title, description }) => {
    const navigate = useNavigate();

    const baseUrl =
      "https://form-builder-53ce7-default-rtdb.asia-southeast1.firebasedatabase.app";
    const formsCollection = "forms";
    const documentId = formKey;

     const formHandler = () => {
       navigate(`/submit/${id}`, { state: { id, title, description, form, formContent } });
     };

     const editHandler = () => {
       navigate(`/edit/form/${id}`, { state: { cardKey, id, title, formKey, description, form, formContent } });
     };

    const deleteHandler = () => {
     axios
       .delete(`${baseUrl}/${formsCollection}/${documentId}.json`)
       .then((response) => {
         console.log("Document deleted successfully", response);
       })
       .then(
        console.log("Form deleted successfully")
       )
       .catch((error) => {
         console.error("Error deleting document", error);
       });
    };


  return (
    <div className="border w-[290px] py-3 px-5 flex flex-col ">
      {form && (
        <>
          <div className="font-semibold text-3xl">{title}</div>
          <div className="font-semibold text-xl mt-2">{description}</div>
          <div className="flex justify-between mt-2">
            <button className="py-1 px-4 border" onClick={editHandler}>Edit</button>
            <button className="py-1 px-4 border" onClick={deleteHandler}>Delete</button>
            <button className="py-1 px-4 border" onClick={formHandler}>
              Preview
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default FormCard