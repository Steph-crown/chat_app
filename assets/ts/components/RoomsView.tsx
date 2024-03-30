import React, { FC, useState } from "react";

import RoomCard from "./RoomCard";
import { RoomType } from "../types";

type Props = {
  rooms: RoomType[];
  openCreateRoomModal: () => void;
};

const RoomsView: FC<Props> = ({ rooms, openCreateRoomModal }) => {
  const [roomSearchQuery, setRoomSearchQuery] = useState("");

  const handleRoomSearchQueryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRoomSearchQuery(e.target.value.trim());
  };

  const filterRoomsBySearch = (rooms: RoomType[], searchQuery: string) => {
    if (!rooms?.length) return [];
    return rooms.filter((room) =>
      room.name
        .toLowerCase()
        ?.trim()
        .includes(searchQuery.toLowerCase()?.trim())
    );
  };

  const getJoinedRooms = (rooms: RoomType[]) => {
    return filterRoomsBySearch(rooms, roomSearchQuery).filter(
      (room) => room.is_member
    );
  };

  const getOtherRooms = (rooms: RoomType[]) => {
    return filterRoomsBySearch(rooms, roomSearchQuery).filter(
      (room) => !room.is_member
    );
  };

  return (
    <div className="flex divide-x-[#EBEBEB] divide-x-[1px]">
      <section className="w-[22%] h-screen px-6 py-7">
        <div className="flex items-center justify-between">
          <h3 className="text-xl text-[#41A080] font-bold">ChatPhoenix</h3>

          <button onClick={openCreateRoomModal}>
            <img src="/images/plus-icon.svg" alt="add room" />
          </button>
        </div>
        <input
          type="search"
          placeholder="Search rooms ..."
          className="input block mb-7 mt-9"
          id="room-name"
          value={roomSearchQuery}
          onChange={handleRoomSearchQueryChange}
        />

        {getJoinedRooms(rooms)?.length > 0 && (
          <div className="flex flex-col gap-y-2">
            <p className="text-[#818181] text-xs font-medium">JOINED ROOMS</p>

            {getJoinedRooms(rooms).map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </div>
        )}

        {getOtherRooms(rooms)?.length > 0 && (
          <div className="flex flex-col gap-y-2 mt-4">
            <p className="text-[#818181] text-xs font-medium">DISCOVER ROOMS</p>

            {getOtherRooms(rooms).map((room) => (
              <RoomCard key={room.id} {...room} />
            ))}
          </div>
        )}
      </section>

      <section className="w-[56%] h-screen"></section>

      <section className="w-[22%] h-screen"></section>
    </div>
  );
};

export default RoomsView;
