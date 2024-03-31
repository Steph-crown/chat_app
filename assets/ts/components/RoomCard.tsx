import React, { FC, useState } from "react";

import JoinRoomPrompt from "./JoinRoomPrompt";
import Modal from "./Modal";
import { RoomType } from "../types";
import { getDummyPhoto } from "../utils";

type Props = RoomType & {
  handleSetActiveRoom: (roomId: number) => void;
};

const RoomCard: FC<Props> = (props) => {
  const { id, name, is_member, handleSetActiveRoom } = props;
  const [isJoinPromptOpen, setIsJoinPromptOpen] = useState(false);

  const openJoinPrompt = () => {
    setIsJoinPromptOpen(true);
  };

  const closeJoinPrompt = () => {
    setIsJoinPromptOpen(false);
  };

  const handleSelectRoom = () => {
    if (is_member) {
      handleSetActiveRoom(id);
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
          <img src={`/images/${getDummyPhoto(id)}`} alt="" />

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
