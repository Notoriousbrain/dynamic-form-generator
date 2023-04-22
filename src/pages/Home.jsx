import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import uuid from 'react-uuid';
import axios from 'axios';
import { FormCard } from '../components';

const Home = () => {
    const navigate = useNavigate();
    const id = uuid();
    const [form, setForm] = useState("");
    const [formKey, setFormKey] = useState([]);

    const submitHandler = () => {
        navigate(`/form/${id}`,{state: {id}})
    }
    
useEffect(() => {
  const fetchFormCard = async () => {
    try {
      const { data } = await axios.get(
        "https://form-builder-53ce7-default-rtdb.asia-southeast1.firebasedatabase.app/forms.json"
      );
      if (data) {
        setForm(Object.values(data));
        setFormKey(Object.keys(data));
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
    <div className=" flex justify-center mt-10 px-4 ">
      <div className="bg-white w-full pt-3 pb-10 px-5 ">
        <h1 className="text-3xl font-semibold mt-4 mb-6">
          Create a dynamic form{" "}
        </h1>
        <div className="flex flex-wrap gap-4 items-center">
          {form &&
            form.map((formData, i) => (
              <FormCard
                key={formKey[i]}
                id={formData.id}
                formContent={formData.formContent}
                formRequired={formData.formContent.required}
                form={form}
                title={formData.formTitle}
                description={formData.formDesc}
                formKey={formKey[i]}
              />
            ))}

          <button
            onClick={submitHandler}
            className="border border-gray-300 py-2 w-[290px] h-[120px] text-2xl font-semibold  "
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home