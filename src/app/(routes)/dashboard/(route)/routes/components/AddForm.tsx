import React, { useState } from "react";
import { Input } from "@/components";
import AddButton from "@/components/templates/dashboard/AddButton";

import { routeFormFields } from "@/libs/mongoose/models/route";

export default function AddRouteForm({idealNumFields = 8}) {
  const [showImagePrev, setShowImagePrev] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const formFields = routeFormFields; // Assuming routeFormFields is an array of form fields.

  // Calculate the number of steps needed based on the form fields.
  const numSteps = Math.ceil(formFields.length / idealNumFields);

  // Calculate progress percentage for the progress bar
  const progressPercentage = ((currentStep + 1) / numSteps) * 100;

  // Function to render a specific step.
  const renderStep = (stepIndex:number) => {
    const startIdx = stepIndex * idealNumFields;
    const endIdx = Math.min((stepIndex + 1) * idealNumFields, formFields.length);

    return (
      <div
        className={`flex flex-col w-full mid:w-[500px] py-5 text-gray-600 ${
          currentStep !== stepIndex ? "hidden" : ""
        }`}
        key={stepIndex}
      >
        {/* Display progress bar */}
        <div className="mb-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                  Step {stepIndex + 1}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-teal-600">
                  {progressPercentage}%
                </span>
              </div>
            </div>
            <div className="flex h-2 mb-4 overflow-hidden text-xs bg-teal-200 rounded">
              <div
                style={{ width: `${progressPercentage}%` }}
                className="flex flex-col justify-center text-center text-white bg-teal-500 shadow-none whitespace-nowrap"
              ></div>
            </div>
          </div>
        </div>

        {formFields.slice(startIdx, endIdx).map((field) => (
          <Input {...field} key={field.name} />
        ))}
        {stepIndex === numSteps - 1 && (
          <AddButton
            label={`Add Route`}
            // label={`Add Driver - Step ${stepIndex + 1}`}
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
          type="button"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="text-blue-500 cursor-pointer"
          >
            Previous
          </button>
        )}
        {currentStep < numSteps - 1 && (
          <button
          type="button"
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
