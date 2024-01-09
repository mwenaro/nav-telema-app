"use client";
import { DeleteButton, Img, PageHOC } from "@/components";
import { useGlobalContext } from "@/context/GlobalContext";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Wrapper } from "@/components/templates/dashboard/main";
import { FaEdit } from "react-icons/fa";
import AddCheckpointModal from "./AddFormModal";
import { Checkpoint } from "@/libs/mongoose/models/checkpoint";
import { useFetch } from "@/hooks";

export default function DashboardCheckpoints({ vendor, params }: any) {
  // const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [selectedCheckpoint, setSelectedCheckpoint] =
    useState<Checkpoint | null>(null);
  const { data: globalData, setData } = useGlobalContext();
  let { data: checkpoints, error } = useFetch("/api/checkpoint");
  const searchParams = useSearchParams();

  if (!Array.isArray(checkpoints)) checkpoints = [];

  return (
    <PageHOC>
      <Wrapper shouldAddBtn={true} addBtnLabel="Add Checkpoint">
        {/* Headers */}

        <div className="w-full overflow-x-hidden grid grid-cols-4 md:grid-cols-9 border-b-2 border-solid bg-[#f9f9ff] font-bold py-3 mx-1 text-sm">
          <span className="overflow-hidden">#</span>
          <span className="overflow-hidden">Name</span>
          <span className="overflow-hidden hidden md:flex">Town</span>
          <span className="overflow-hidden col-span-2 hidden md:flex ">
            Contact Number
          </span>
          <span className="overflow-hidden col-span-2  hidden md:flex">Coordinate</span>

          <span className="overflow-hidden text-center col-span-2">Operations</span>
        </div>

        {checkpoints.map((p: Checkpoint, indx: number) => (
          <div
            key={`${p._id}-${indx}`}
            className="w-full overflow-x-hidden grid  grid-cols-5 md:grid-cols-9  border-b-2 border-solid hover:bg-[#f9f9ff] py-3 mx-1 text-sm place-content-center"
          >
            <span className="overflow-hidden">{indx + 1}</span>
            <span className="overflow-hidden ">{p.name}</span>
            <span className="overflow-hidden hidden md:flex">{p.town}</span>
            <span className="overflow-hidden col-span-2 hidden md:flex">
              {p.contactNo}
            </span>
            <span className="overflow-hidden  text-clip hidden md:flex">
              {p.latitude}, {p.longitude}
            </span>

            <span
              className={`overflow-hidden flex justify-center items-center`}
            >
              {" "}
            </span>
            <div className="flex justify-between items-center ">
              <button
                onClick={() => {
                  setSelectedCheckpoint(p);
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

              <DeleteButton id={p._id!} table="checkpoint" />
            </div>
          </div>
        ))}
        <AddCheckpointModal selectedCheckpoint={selectedCheckpoint} />
      </Wrapper>
    </PageHOC>
  );
}
