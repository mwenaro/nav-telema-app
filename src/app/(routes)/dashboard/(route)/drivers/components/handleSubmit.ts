import { Driver } from "@/types/core";
import { postData, updateById } from "@/utils";
import Swal from "sweetalert2";

export const postDriver = async (data: Driver, cb: any = null) => {
  // console.log({data})
  try {
    let res = await postData(`/api/driver`, data);
    console.log({ res });
    if (!res.success) throw new Error("Could not create Driver. Try again");

    Swal.fire("Success", "Driver created successfully");
  } catch (error: any) {
    console.log({ error });
    Swal.fire("Error", error.message);
  }
  // Refresh callback
  cb();
};

export const updateDriver = async (data: Driver, handleReset: any = null) => {
  const { _id, ...formData } = data;

  try {
    let res = await updateById(`/api/driver/${_id}`, formData);
    console.log({ res });
    if (!res.success) throw new Error("Could not update Driver. Try again");

    Swal.fire("Success", "Driver updated successfully");
  } catch (error: any) {
    console.log({ error });
    Swal.fire("Error", error.message);
  }

  handleReset && handleReset();
};
