"use client";
import { DeleteButton, Img, PageHOC } from "@/components";
import { useGlobalContext } from "@/context/GlobalContext";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import { Wrapper } from "@/components/templates/dashboard/main";
import { FaEdit } from "react-icons/fa";
import AddTownModal from "./AddFormModal";
import { Town } from "@/libs/mongoose/models/town";
import { useFetch } from "@/hooks";

export default function DashboardTowns({ vendor, params }: any) {
  // const [towns, setTowns] = useState<Town[]>([]);
  const [selectedTown, setSelectedTown] = useState<Town | null>(null);
  const { data: globalData, setData } = useGlobalContext();
  let { data: towns, error } = useFetch("/api/town");
  const searchParams = useSearchParams();



  if (!Array.isArray(towns)) towns = [] ;

  return (
    <PageHOC>
      <Wrapper shouldAddBtn={true} addBtnLabel="Add Town">
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

        {towns.map((p: Town, indx: number) => (
          <div
            key={`${p._id}-${indx}`}
            className="w-full overflow-x-hidden grid  grid-cols-6 md:grid-cols-10  border-b-2 border-solid hover:bg-[#f9f9ff] py-3 mx-1 text-sm place-content-center"
          >
            <span className="overflow-hidden">{indx + 1}</span>
            <span className="overflow-hidden "></span>
            <span className="overflow-hidden ">{p.name}</span>
            <span className="overflow-hidden hidden md:flex">
              {p.shortName}
            </span>
            <span className="overflow-hidden col-span-2 text-clip hidden md:flex">
              {p.country}
            </span>
            <span className="overflow-hidden hidden md:flex">{}</span>

            <span
              className={`overflow-hidden flex justify-center items-center`}
            >
              {" "}
            </span>
            <div className="flex justify-between items-center ">
              <button
                onClick={() => {
                  setSelectedTown(p);
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

              <DeleteButton id={p._id!} table="town" />
            </div>
          </div>
        ))}
        <AddTownModal selectedTown={selectedTown} />
      </Wrapper>
    </PageHOC>
  );
}
