"use client";

import Modal from "@/components/molecules/Modal";
import { UniversalFormikForm } from "@/components/templates/form";
import { useGlobalContext } from "@/context/GlobalContext";
import AddCheckpointForm from "./AddForm";

import LocalStorageManager from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { postCheckpoint, updateCheckpoint } from "./handleSubmit";
import { initialCheckpointValues, checkpointSchemaValidation } from "@/libs/mongoose/models/checkpoint";

export default function AddCheckpointModal({ selectedCheckpoint, checkpoints }: any) {
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
          !selectedCheckpoint
            ? postCheckpoint({ ...values }, () => {
                resetForm();
                router.refresh();
              })
            : updateCheckpoint(values, () => {
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
          selectedCheckpoint ?? initialCheckpointValues
        }
        validationSchema={checkpointSchemaValidation}
      >
        {!selectedCheckpoint ? (
          <AddCheckpointForm />
        ) : (
          // <EditCheckpointForm handleSubmit={() => console.log("")}  />
          <AddCheckpointForm />
        )}
      </UniversalFormikForm>
    </Modal>
  );
}
