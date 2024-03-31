import React, { useEffect, useState } from "react";

import CreateRoom from "./CreateRoom";
import Modal from "./Modal";
import NoRoomsView from "./NoRoomsView";
import { RoomType } from "../types";
import RoomsView from "./RoomsView";
import roomChannel from "../channels/room_channel";

const RoomLayout = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [activeRoom, setActiveRoom] = useState<RoomType | null>(null);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);

  const openCreateRoomModal = () => {
    setIsCreateRoomModalOpen(true);
  };

  const closeCreateRoomModal = () => {
    setIsCreateRoomModalOpen(false);
  };

  const handleSetActiveRoom = (roomId: number) => {
    roomChannel
      .push("set_active_room", { room_id: roomId })
      .receive("ok", (response) => {
        setActiveRoom(response);
      })
      .receive("error", (err) => {
        alert("You are not a member of this room");
        console.log(err);
      });
  };

  roomChannel.on("new_room", (response: RoomType) => {
    setRooms([response, ...rooms]);
  });

  roomChannel.on("update_rooms", (response: { rooms: RoomType[] }) => {
    setRooms(response?.rooms ?? []);
  });

  roomChannel.on("update_active_room", (response: RoomType) => {
    setActiveRoom(response);
  });

  // synchronize the socket state.
  useEffect(() => {
    roomChannel.push("sync_rooms", { rooms: rooms });
  }, [rooms]);

  return (
    <div>
      {rooms?.length ? (
        <RoomsView
          rooms={rooms}
          activeRoom={activeRoom}
          openCreateRoomModal={openCreateRoomModal}
          handleSetActiveRoom={handleSetActiveRoom}
        />
      ) : (
        <NoRoomsView openCreateRoomModal={openCreateRoomModal} />
      )}

      <Modal isOpen={isCreateRoomModalOpen} close={closeCreateRoomModal}>
        <CreateRoom close={closeCreateRoomModal} />
      </Modal>
    </div>
  );
};

export default RoomLayout;
