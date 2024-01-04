// "use client"

import { useState } from "react";
import { Input } from "@/components";
import AddButton from "@/components/templates/dashboard/AddButton";

import { companyFormFields } from "@/libs/mongoose/models/company";



export default function AddCompanyForm() {
  const [showImagePrev, setShowImagePrev] = useState(false);

  return (
    <div className=" flex flex-col w-full  mid:w-[500px] py-5  text-gray-600 ">
      {companyFormFields.map((field) => (
        <>
          {field.options ? (
            <Input
             {...field}
              key={field.name}
            />
          ) : (
            <Input
              {...field}
              key={field.name}
            />
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
