import React, { FC } from "react";

import { RoomType } from "../types";

type Props = {
  room: RoomType;
};

const RoomDirectory: FC<Props> = ({ room }) => {
  return (
    <div>
      <div className="px-6 py-[18px] flex items-center gap-x-4 border-b border-solid border-b-[#EBEBEB]">
        <p className="font-semibold text-xl">Directory</p>
      </div>

      <div className="py-6 px-4">
        <div className="flex gap-x-2 mb-2">
          <p className="text-sm font-semibold">Room Members</p>
        </div>
      </div>

      <div className="border-t border-solid border-[#EBEBEB] py-6 px-4">
        <p className="text-sm font-semibold mb-2">Room Description</p>

        <div className="bg-[#F4FAF8] p-4 rounded-lg mb-5">
          <p className="text-sm font-semibold text-[#7A7D7C]">
            {room?.description}
          </p>
        </div>

        <button className="flex items-center text-[#EB5757] text-xs font-semibold gap-x-2 float-right">
          Leave room
          <img src="/images/leave-icon.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default RoomDirectory;
