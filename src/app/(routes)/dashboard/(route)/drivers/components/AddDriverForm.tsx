// "use client"

import { useState } from "react";
import { Input } from "@/components";
import AddButton from "@/components/templates/dashboard/AddButton";
import { DriverFormFields } from "@/data/forms";


export default function AddProductForm() {
  const [showImagePrev, setShowImagePrev] = useState(false);

  return (
    <div className=" flex flex-col w-full  mid:w-[500px] py-5  text-gray-600 ">
      {DriverFormFields.map((field) => (
        <>
          {field.options ? (
            <Input
              label={field.label}
              type={field.type}
              name={field.name}
              options={field.options}
            />
          ) : (
            <Input label={field.label} type={field.type} name={field.name} />
          )}
        </>
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
