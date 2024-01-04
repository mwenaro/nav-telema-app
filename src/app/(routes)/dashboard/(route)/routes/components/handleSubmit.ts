import { Route } from "@/libs/mongoose/models/route";
import { postData, updateById } from "@/utils";
import Swal from "sweetalert2";

export const postRoute = async (data: Route, cb: any = null) => {
  // console.log({data})
  try {
    let res = await postData(`/api/route`, data);
    console.log({ res });
    if (!res.success) throw new Error("Could not create Route. Try again");

    Swal.fire("Success", "Route created successfully");
  } catch (error: any) {
    console.log({ error });
    Swal.fire("Error", error.message);
  }
  // Refresh callback
  cb();
};

export const updateRoute = async (data: Route, handleReset: any = null) => {
  const { _id, ...formData } = data;

  try {
    let res = await updateById(`/api/route/${_id}`, formData);
    console.log({ res });
    if (!res.success) throw new Error("Could not update Route. Try again");

    Swal.fire("Success", "Route updated successfully");
  } catch (error: any) {
    console.log({ error });
    Swal.fire("Error", error.message);
  }

  handleReset && handleReset();
};
