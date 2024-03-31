import React, { FC } from "react";

import { RoomType } from "../types";
import { getDummyPhoto } from "../utils";

type Props = {
  room: RoomType;
};

const RoomMessages: FC<Props> = ({ room }) => {
  const { name, id } = room;
  return (
    <div>
      <div className="px-6 py-[18px] flex items-center gap-x-4 border-b border-solid border-b-[#EBEBEB]">
        <img src={`/images/${getDummyPhoto(id)}`} alt="" />

        <div>
          <p className="font-semibold text-xl">{name}</p>
          <div className="flex items-center gap-x-2">
            <img src="/images/green-dot.svg" alt="" />{" "}
            {/* we'll update this number later. */}
            <p className="text-black text-xs font-semibold">4 members online</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="h-[calc(100vh_-_190px)] flex items-center justify-center">
          <p className="text-[#818181]">Chat messages will appear here</p>
        </div>

        <div className="w-full py-6 ">
          <form action="" className="relative">
            <input
              type="text"
              name=""
              id=""
              className="input"
              placeholder="Type a message"
            />

            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <img src="/images/send-icon.svg" alt="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomMessages;
