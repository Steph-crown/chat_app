import React, { FC, useState } from "react";

import roomChannel from "../channels/room_channel";

type Props = {
  close: () => void;
};

const CreateRoom: FC<Props> = ({ close }) => {
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    roomChannel
      .push("create_room", {
        name: roomName,
        description: roomDescription,
      })
      .receive("ok", (response) => {
        close();
      })
      .receive("error", (error) => {
        console.log(error);
      })
      .receive("timeout", () => {
        console.log("timed out");
      });
  };

  const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handleRoomDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRoomDescription(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" className="absolute right-6 top-6" onClick={close}>
        <img src="/images/close.svg" alt="" />
      </button>{" "}
      <h3 className="text-base font-bold leading-[19px] mt-6 mb-6 text-shades/black">
        Create New Room
      </h3>
      <div>
        {/* room name field. */}
        <div>
          <label
            htmlFor="room-name"
            className="font-normal text-xs leading-5 text-shades/black mb-[2px] block"
          >
            Room name
          </label>

          <input
            type="text"
            placeholder="Enter room name"
            className="input"
            id="room-name"
            value={roomName}
            onChange={handleRoomNameChange}
          />
        </div>

        {/* room description field. */}
        <div className="mt-4 mb-8">
          <label
            htmlFor="room-description"
            className="font-normal text-xs leading-5 text-shades/black mb-[2px] block"
          >
            Room description (<i>What is this room about?</i>)
          </label>

          <textarea
            placeholder="Enter room name"
            className="input h-[70px]"
            id="room-description"
            value={roomDescription}
            onChange={handleRoomDescriptionChange}
          />
        </div>

        <div className="flex justify-between items-center">
          <button className="btn btn__outline" type="button" onClick={close}>
            Cancel
          </button>

          <button className="btn" disabled={!roomName || !roomDescription}>
            Create room
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateRoom;
