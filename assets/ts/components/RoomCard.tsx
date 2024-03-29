import React, { FC } from "react";

import { RoomType } from "../types";

type Props = RoomType;

const displayPhotos = [
  "avatar1.svg",
  "avatar2.svg",
  "avatar3.svg",
  "avatar4.svg",
  "avatar5.svg",
  "avatar6.svg",
];

const RoomCard: FC<Props> = ({ id, name, description }) => {
  // get picture index using id to display a unique picture for each room.
  const pictureIndex = id % displayPhotos.length;

  return (
    <div className="flex p-3 hover:bg-[#F4FAF8] transition-all rounded-lg">
      <div className="flex gap-x-4 items-center">
        <img src={`/images/${displayPhotos[pictureIndex]}`} alt="" />

        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-[#999999] text-xs">Last message</p>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
