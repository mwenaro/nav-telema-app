"use client";

import Modal from "@/components/molecules/Modal";
import { UniversalFormikForm } from "@/components/templates/form";
import { useGlobalContext } from "@/context/GlobalContext";
import AddTruckForm from "./AddForm";

import LocalStorageManager from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { postTruck, updateTruck } from "./handleSubmit";
import { truckSchemaValidation, initialTruckValues } from "@/libs/mongoose/models/truck";


export default function AddTruckModal({ selectedTruck, trucks }: any) {
  const router = useRouter();
  const { data: globalData, setData } = useGlobalContext(),
    { isModalOpen } = globalData;
  const user = globalData.user || LocalStorageManager?.get("user");

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setData({ ...globalData, isModalOpen: false })}
      className=" rounded-none overflow-y-scroll"
    >
      <UniversalFormikForm
        handleSubmit={(values, { resetForm }) => {
          !selectedTruck
            ? postTruck({ ...values }, () => {
                resetForm();
                router.refresh();
              })
            : updateTruck(values, () => {
                resetForm();
                setData({
                  ...globalData,
                  isModalOpen: !isModalOpen,
                });
              });
          resetForm();
          router.refresh();
        }}
        initialValues={
          selectedTruck ?? initialTruckValues
        }
        validationSchema={truckSchemaValidation}
      >
        {!selectedTruck ? (
          <AddTruckForm />
        ) : (
          // <EditTruckForm handleSubmit={() => console.log("")}  />
          <AddTruckForm />
        )}
      </UniversalFormikForm>
    </Modal>
  );
}
