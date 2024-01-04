import { Company } from "@/libs/mongoose/models/company";
import { postData, updateById } from "@/utils";
import Swal from "sweetalert2";

export const postCompany = async (data: Company, cb: any = null) => {
  // console.log({data})
  try {
    let res = await postData(`/api/company`, data);
    console.log({ res });
    if (!res.success) throw new Error("Could not create Company. Try again");

    Swal.fire("Success", "Company created successfully");
  } catch (error: any) {
    console.log({ error });
    Swal.fire("Error", error.message);
  }
  // Refresh callback
  cb();
};

export const updateCompany = async (data: Company, handleReset: any = null) => {
  const { _id, ...formData } = data;

  try {
    let res = await updateById(`/api/company/${_id}`, formData);
    console.log({ res });
    if (!res.success) throw new Error("Could not update Company. Try again");

    Swal.fire("Success", "Company updated successfully");
  } catch (error: any) {
    console.log({ error });
    Swal.fire("Error", error.message);
  }

  handleReset && handleReset();
};
