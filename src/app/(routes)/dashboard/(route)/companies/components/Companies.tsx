"use client";
import { DeleteButton, Img, PageHOC } from "@/components";
import { useGlobalContext } from "@/context/GlobalContext";

import { fetchData } from "@/utils";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Wrapper } from "@/components/templates/dashboard/main";
import { FaEdit } from "react-icons/fa";
import AddCompanyModal from "./AddFormModal";
import { Company } from "@/libs/mongoose/models/company";
import { useFetch } from "@/hooks";

export default function DashboardCompanies({ vendor, params }: any) {
  // const [companys, setCompanys] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const { data: globalData, setData } = useGlobalContext();
  const {data:companys, error}  = useFetch('/api/company')
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const fetchCompanys = await fetchData(`/api/company`);

  //       setCompanys(Array.isArray(fetchCompanys) ? fetchCompanys : []);
  //     } catch (error: any) {
  //       console.log({ error: error.message });
  //     }
  //   })();
  // });

  if (!Array.isArray(companys) || companys?.length <=0) return <div>No companys</div>;

  return (
    <PageHOC>
      <Wrapper shouldAddBtn={true} addBtnLabel="Add Company">
        {/* Headers */}

        <div className="w-full overflow-x-hidden grid grid-cols-6 md:grid-cols-10 border-b-2 border-solid bg-[#f9f9ff] font-bold py-3 mx-1 text-sm">
          <span className="overflow-hidden">#</span>
          <span className="overflow-hidden">Image</span>
          <span className="overflow-hidden hidden md:flex">Name</span>
          <span className="overflow-hidden hidden md:flex ">Number</span>
          <span className="overflow-hidden col-span-2 hidden md:flex">
            Country
          </span>
          <span className="overflow-hidden hidden md:flex">City</span>

          <span className="overflow-hidden">Status</span>
          <span className="overflow-hidden">Edit</span>
        </div>

        {companys.map((p: Company, indx: number) => (
          <div
            key={`${p._id}-${indx}`}
            className="w-full overflow-x-hidden grid  grid-cols-6 md:grid-cols-10  border-b-2 border-solid hover:bg-[#f9f9ff] py-3 mx-1 text-sm place-content-center"
          >
            <span className="overflow-hidden">{indx + 1}</span>
            <span className="overflow-hidden "></span>
            <span className="overflow-hidden ">{p.companyName}</span>
            <span className="overflow-hidden hidden md:flex">{p.email}</span>
            <span className="overflow-hidden col-span-2 text-clip hidden md:flex">
              {p.country}
            </span>
            <span className="overflow-hidden hidden md:flex">{p.city}</span>

            <span
              className={`overflow-hidden flex justify-center items-center`}
            >
              {" "}
              <span
                className={`p-1 rounded-full mx-1 ${
                  p.status ? "bg-green-300" : "bg-red-400"
                }`}
              ></span>
              {`${p.status ? "Active" : "Inactive"}`}
            </span>
            <div className="flex justify-between items-center ">
              <button
                onClick={() => {
                  setSelectedCompany(p);
                  setData({
                    ...globalData,
                    isModalOpen: !globalData.isModalOpen,
                  });
                }}
                className="border-2 border-solid border-orange-400 px-2 py-2 rounded-md"
              >
                {" "}
                <FaEdit className="text-lg text-orange-400" />
              </button>

              <DeleteButton id={p._id!} table="company" />
            </div>
          </div>
        ))}
        <AddCompanyModal selectedCompany={selectedCompany} />
      </Wrapper>
    </PageHOC>
  );
}
