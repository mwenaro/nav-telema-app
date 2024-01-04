"use client";

import Modal from "@/components/molecules/Modal";
import { UniversalFormikForm } from "@/components/templates/form";
import { useGlobalContext } from "@/context/GlobalContext";
import AddTownForm from "./AddForm";

import LocalStorageManager from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { postTown, updateTown } from "./handleSubmit";
import { initialTownValues, townSchemaValidation } from "@/libs/mongoose/models/town";

export default function AddTownModal({ selectedTown, towns }: any) {
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
          !selectedTown
            ? postTown({ ...values }, () => {
                resetForm();
                router.refresh();
              })
            : updateTown(values, () => {
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
          selectedTown ?? initialTownValues
        }
        validationSchema={townSchemaValidation}
      >
        {!selectedTown ? (
          <AddTownForm />
        ) : (
          // <EditTownForm handleSubmit={() => console.log("")}  />
          <AddTownForm />
        )}
      </UniversalFormikForm>
    </Modal>
  );
}
