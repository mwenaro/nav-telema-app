"use client";
import * as Yup from "yup";

import Modal from "@/components/molecules/Modal";
import { UniversalFormikForm } from "@/components/templates/form";
import { useGlobalContext } from "@/context/GlobalContext";
import AddDriverForm from "./AddDriverForm";
import { postDriver, updateDriver } from "./handleSubmit";
import LocalStorageManager from "@/utils/localStorage";
import { useRouter } from "next/navigation";


export default function AddDriverModal({ selectedDriver, categories }: any) {
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
          !selectedDriver
            ? postDriver({ ...values }, () => {
                resetForm();
                router.refresh();
              })
            : updateDriver(values, () => {
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
          selectedDriver ?? {
            firstName: '',
            lastName: '',
            driverNumber: '',
            state: '',
            city: '',
            contactNumber: '',
            defaultObjectNo: '',
            password: '',
          }
        }
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required('First Name is required'),
          lastName: Yup.string().required('Last Name is required'),
          driverNumber: Yup.string().required('Driver Number is required'),
          state: Yup.string().required('State is required'),
          city: Yup.string(),
          contactNumber: Yup.string().required('Contact Number is required'),
          defaultObjectNo: Yup.string(),
          password: Yup.string()
            .min(3, 'Password must be at least 3 characters')
            .max(20, 'Password must not exceed 20 characters')
            .required('Password is required'),
        })}
      >
        {!selectedDriver ? (
          <AddDriverForm />
        ) : (
          // <EditDriverForm handleSubmit={() => console.log("")}  />
          <AddDriverForm  />
        )}
      </UniversalFormikForm>
    </Modal>
  );
}
