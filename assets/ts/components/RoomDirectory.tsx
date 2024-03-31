import React, { FC, useEffect, useState } from "react";

import { RoomType } from "../types";
import { getDummyPhoto } from "../utils";
import roomChannel from "./../channels/room_channel";

type Props = {
  room: RoomType;
  members: string[];
};

const RoomDirectory: FC<Props> = ({ room, members }) => {
  return (
    <div>
      <div className="px-6 py-[26px] flex items-center gap-x-4 border-b border-solid border-b-[#EBEBEB]">
        <p className="font-semibold text-xl">Directory</p>
      </div>

      <div className="py-6 px-4">
        <div className="flex gap-x-2 mb-2">
          <p className="text-sm font-semibold">Room Members</p>
        </div>

        <div className="flex flex-col gap-y-2">
          {members?.map((memberId) => (
            <div key={memberId} className="flex justify-between p-3">
              <div className="flex items-center gap-x-2 ">
                <img
                  src={`/images/${getDummyPhoto(parseInt(memberId[0]))}`}
                  alt=""
                />

                <div>
                  <p className="text-sm font-semibold flex">
                    {memberId}
                    <sup>
                      <img src="/images/green-dot.svg" alt="" />
                    </sup>
                  </p>
                  {/* we'll update this later. */}
                  <p className="text-xs font-semibold text-[#999999]">
                    Joined today
                  </p>
                </div>
              </div>

              {memberId === room?.creator_id && (
                <div className="border border-solid border-[#CBD5E0] rounded-xl h-max flex items-center">
                  <p className="text-xs text-[#718096] font-semibold py-[2px] px-2">
                    Creator
                  </p>
                </div>
              )}
            </div>
          ))}
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
