import React, { FC, useState } from "react";

import JoinRoomPrompt from "./JoinRoomPrompt";
import Modal from "./Modal";
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

const RoomCard: FC<Props> = (props) => {
  const { id, name, is_member } = props;
  const [isJoinPromptOpen, setIsJoinPromptOpen] = useState(false);
  // get picture index using id to display a unique picture for each room.
  const pictureIndex = id % displayPhotos.length;

  const openJoinPrompt = () => {
    setIsJoinPromptOpen(true);
  };

  const closeJoinPrompt = () => {
    setIsJoinPromptOpen(false);
  };

  const handleSelectRoom = () => {
    if (is_member) {
      // open the room.
    } else {
      openJoinPrompt();
    }
  };

  return (
    <>
      <div
        className="flex p-3 hover:bg-[#F4FAF8] transition-all rounded-lg cursor-pointer"
        onClick={handleSelectRoom}
      >
        <div className="flex gap-x-4 items-center">
          <img src={`/images/${displayPhotos[pictureIndex]}`} alt="" />

          <div>
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-[#999999] text-xs">Last message</p>
          </div>
        </div>
      </div>

      <Modal isOpen={isJoinPromptOpen} close={closeJoinPrompt}>
        <JoinRoomPrompt close={closeJoinPrompt} {...props} />
      </Modal>
    </>
  );
};

export default RoomCard;
