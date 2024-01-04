import { Town } from "@/libs/mongoose/models/town";
import { postData, updateById } from "@/utils";
import Swal from "sweetalert2";

export const postTown = async (data: Town, cb: any = null) => {
  // console.log({data})
  try {
    let res = await postData(`/api/town`, data);
    console.log({ res });
    if (!res.success) throw new Error("Could not create Town. Try again");

    Swal.fire("Success", "Town created successfully");
  } catch (error: any) {
    console.log({ error });
    Swal.fire("Error", error.message);
  }
  // Refresh callback
  cb();
};

export const updateTown = async (data: Town, handleReset: any = null) => {
  const { _id, ...formData } = data;

  try {
    let res = await updateById(`/api/town/${_id}`, formData);
    console.log({ res });
    if (!res.success) throw new Error("Could not update Town. Try again");

    Swal.fire("Success", "Town updated successfully");
  } catch (error: any) {
    console.log({ error });
    Swal.fire("Error", error.message);
  }

  handleReset && handleReset();
};
