import { Checkpoint } from "@/libs/mongoose/models/checkpoint";
import { postData, updateById } from "@/utils";
import Swal from "sweetalert2";

export const postCheckpoint = async (data: Checkpoint, cb: any = null) => {
  // console.log({data})
  try {
    let res = await postData(`/api/checkpoint`, data);
    console.log({ res });
    if (!res.success) throw new Error("Could not create Checkpoint. Try again");

    Swal.fire("Success", "Checkpoint created successfully");
  } catch (error: any) {
    console.log({ error });
    Swal.fire("Error", error.message);
  }
  // Refresh callback
  cb();
};

export const updateCheckpoint = async (data: Checkpoint, handleReset: any = null) => {
  const { _id, ...formData } = data;

  try {
    let res = await updateById(`/api/checkpoint/${_id}`, formData);
    console.log({ res });
    if (!res.success) throw new Error("Could not update Checkpoint. Try again");

    Swal.fire("Success", "Checkpoint updated successfully");
  } catch (error: any) {
    console.log({ error });
    Swal.fire("Error", error.message);
  }

  handleReset && handleReset();
};
