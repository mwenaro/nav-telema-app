// "use client"

import AddButton from "@/components/templates/dashboard/AddButton";
import { DriverFormFields } from "@/data/forms";
import { ErrorMessage, Field } from "formik";

import { useState } from "react";

export default function AddProductForm() {
  const [showImagePrev, setShowImagePrev] = useState(false);

  return (
    <div className=" flex flex-col w-full  mid:w-[500px] py-5  text-gray-600 ">
      {DriverFormFields.map((field) => (
        <div key={field.name} className="mb-4">
          <label
            htmlFor={field.name}
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {field.label}
          </label>
          <Field
            type={field.type}
            id={field.name}
            name={field.name}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:shadow-outline"
          />
          <ErrorMessage
            name={field.name}
            component="p"
            className="text-red-500 text-xs italic mt-1"
          />
        </div>
      ))}

      {
        <AddButton
          label={"Add Driver"}
          className="my-6 mx-12"
          type={"submit"}
          onClick={() => {
            setShowImagePrev(!showImagePrev);
          }}
        />
      }
    </div>
  );
}
