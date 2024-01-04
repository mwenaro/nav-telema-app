"use client";

import Modal from "@/components/molecules/Modal";
import { UniversalFormikForm } from "@/components/templates/form";
import { useGlobalContext } from "@/context/GlobalContext";
import AddRouteForm from "./AddForm";

import LocalStorageManager from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { postRoute, updateRoute } from "./handleSubmit";
import { routeSchemaValidation } from "@/libs/mongoose/models/route";

export default function AddRouteModal({ selectedRoute, routes }: any) {
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
          !selectedRoute
            ? postRoute({ ...values }, () => {
                resetForm();
                router.refresh();
              })
            : updateRoute(values, () => {
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
          selectedRoute ?? {
            routeName: '',
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
        validationSchema={routeSchemaValidation}
      >
        {!selectedRoute ? (
          <AddRouteForm />
        ) : (
          // <EditRouteForm handleSubmit={() => console.log("")}  />
          <AddRouteForm />
        )}
      </UniversalFormikForm>
    </Modal>
  );
}
