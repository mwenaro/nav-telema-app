"use client";
import * as Yup from "yup";

import Modal from "@/components/molecules/Modal";
import { UniversalFormikForm } from "@/components/templates/form";
import { useGlobalContext } from "@/context/GlobalContext";
import AddCompanyForm from "./AddForm";

import LocalStorageManager from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { postCompany, updateCompany } from "./handleSubmit";
import { companySchemaValidation } from "@/libs/mongoose/models/company";

export default function AddCompanyModal({ selectedCompany, companys }: any) {
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
          !selectedCompany
            ? postCompany({ ...values }, () => {
                resetForm();
                router.refresh();
              })
            : updateCompany(values, () => {
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
          selectedCompany ?? {
            companyName: '',
            shortName: '',
            userName: '',
            application: '',
            userGroup: '',
            email: '',
            mobileNumber: '',
            telephoneNumber: '',
            country: '',
            state: '',
            city: '',
            monthlySmsLimit: 0,
            dailySmsLimit: 0,
            lastLoginTime: null,
            userTimeZone: '',
            createdDate: null,
          }
        }
        validationSchema={companySchemaValidation}
      >
        {!selectedCompany ? (
          <AddCompanyForm />
        ) : (
          // <EditCompanyForm handleSubmit={() => console.log("")}  />
          <AddCompanyForm />
        )}
      </UniversalFormikForm>
    </Modal>
  );
}
