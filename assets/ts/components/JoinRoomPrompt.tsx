import React, { FC } from "react";

import { RoomType } from "../types";
import roomChannel from "../channels/room_channel";

type Props = RoomType & {
  close: () => void;
};

const JoinRoomPrompt: FC<Props> = ({ name, description, id, close }) => {
  const joinRoom = () => {
    roomChannel
      .push("join_room", { room_id: id })
      .receive("ok", (response) => {
        close();
      })
      .receive("error", (error) => {
        console.error("error joining room", error);
      })
      .receive("timeout", () => {
        console.error("timed out joining room");
      });
  };

  return (
    <div>
      <button type="button" className="absolute right-6 top-6" onClick={close}>
        <img src="/images/close.svg" alt="" />
      </button>
      <h3 className="text-lg font-semibold leading-[28px] mb-3 text-grey/900">
        {name}
      </h3>
      <p className="text-sm text-grey/600 font-normal leading-5 mb-4">
        {description}
      </p>
      <div className="flex justify-between items-center">
        <button className="btn btn__outline" type="button" onClick={close}>
          Close
        </button>

        <button className="btn" onClick={joinRoom}>
          Join room
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPrompt;
