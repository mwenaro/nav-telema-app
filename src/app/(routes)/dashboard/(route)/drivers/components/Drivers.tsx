"use client";
import { DeleteButton, Img } from "@/components";
import { useGlobalContext } from "@/context/GlobalContext";

import { fetchData } from "@/utils";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { DriverPageWrapper } from "./ProductPageWrapper";
import { Wrapper } from "@/components/templates/dashboard/main";
import { FaEdit } from "react-icons/fa";
import AddDriverModal from "./AddDriverModal";
import { Driver } from "@/types/nav-tel-types";
export default function DriverPage({ vendor, params }: any) {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const { data: globalData, setData } = useGlobalContext();
  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      try {
        const fetchDrivers = await  fetchData(`/api/driver`)
        
       
        setDrivers(Array.isArray(fetchDrivers) ? fetchDrivers : []);
      } catch (error: any) {
        console.log({ error: error.message });
      }
    })();
  });

  if (!drivers) return <div>No drivers</div>;
  return (
    <DriverPageWrapper>
      <Wrapper shouldAddBtn={true} addBtnLabel="Add Driver">
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

        {drivers.map((p: Driver, indx: number) => (
          <div
            key={`${p._id}-${indx}`}
            className="w-full overflow-x-hidden grid  grid-cols-6 md:grid-cols-10  border-b-2 border-solid hover:bg-[#f9f9ff] py-3 mx-1 text-sm place-content-center"
          >
            <span className="overflow-hidden">{indx + 1}</span>
            <span className="overflow-hidden ">
             
            </span>
            <span className="overflow-hidden ">{p.firstName} - {p.lastName}</span>
            <span className="overflow-hidden hidden md:flex">{p.contactNumber}</span>
            <span className="overflow-hidden col-span-2 text-clip hidden md:flex">
              {p.state}
            </span>
            <span className="overflow-hidden hidden md:flex">{p.city}</span>
            
            <span
              className={`overflow-hidden flex justify-center items-center`}
            >
              {" "}
              <span
                className={`p-1 rounded-full mx-1 ${
                  p.status
                    ? "bg-green-300"
                    : "bg-red-400"
                }`}
              ></span>
              {(`${p.status ? "Active" : "Inactive"}`)}
            </span>
            <div className="flex justify-between items-center ">
              <button
                onClick={() => {
                  setSelectedDriver(p);
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

              <DeleteButton id={p._id!} table="driver" />
            </div>
          </div>
        ))}
        <AddDriverModal  />
      </Wrapper>
    </DriverPageWrapper>
  );
}
