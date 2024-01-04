import React, { useState } from "react";
import { Input } from "@/components";
import AddButton from "@/components/templates/dashboard/AddButton";

import { companyFormFields } from "@/libs/mongoose/models/company";

export default function AddCompanyForm() {
  const [showImagePrev, setShowImagePrev] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const formFields = companyFormFields; // Assuming companyFormFields is an array of form fields.

  // Calculate the number of steps needed based on the form fields.
  const numSteps = Math.ceil(formFields.length / 8);

  // Function to render a specific step.
  const renderStep = (stepIndex:number) => {
    const startIdx = stepIndex * 8;
    const endIdx = Math.min((stepIndex + 1) * 8, formFields.length);

    return (
      <div
        className={`flex flex-col w-full mid:w-[500px] py-5 text-gray-600 ${
          currentStep !== stepIndex ? "hidden" : ""
        }`}
        key={stepIndex}
      >
        {formFields.slice(startIdx, endIdx).map((field) => (
          <Input {...field} key={field.name} />
        ))}
        {stepIndex === numSteps - 1 && (
          <AddButton
            label={`Add Driver - Step ${stepIndex + 1}`}
            className="my-6 mx-12"
            type="submit"
            onClick={() => {
              setShowImagePrev(!showImagePrev);
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Render each step dynamically based on the number of steps */}
      {[...Array(numSteps)].map((_, index) => (
        <React.Fragment key={index}>{renderStep(index)}</React.Fragment>
      ))}
      {/* Navigation buttons */}
      <div className="flex justify-between mt-4">
        {currentStep > 0 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="text-blue-500 cursor-pointer"
          >
            Previous
          </button>
        )}
        {currentStep < numSteps - 1 && (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="text-blue-500 cursor-pointer"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
