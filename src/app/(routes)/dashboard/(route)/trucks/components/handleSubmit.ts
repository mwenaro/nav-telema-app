import { Truck } from "@/libs/mongoose/models/truck";
import { postData, updateById } from "@/utils";
import Swal from "sweetalert2";

export const postTruck = async (data: Truck, cb: any = null) => {
  // console.log({data})
  try {
    let res = await postData(`/api/truck`, data);
    console.log({ res });
    if (!res.success) throw new Error("Could not create Truck. Try again");

    Swal.fire("Success", "Truck created successfully");
  } catch (error: any) {
    console.log({ error });
    Swal.fire("Error", error.message);
  }
  // Refresh callback
  cb();
};

export const updateTruck = async (data: Truck, handleReset: any = null) => {
  const { _id, ...formData } = data;

  try {
    let res = await updateById(`/api/truck/${_id}`, formData);
    console.log({ res });
    if (!res.success) throw new Error("Could not update Truck. Try again");

    Swal.fire("Success", "Truck updated successfully");
  } catch (error: any) {
    console.log({ error });
    Swal.fire("Error", error.message);
  }

  handleReset && handleReset();
};
