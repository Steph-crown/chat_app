import React, { useEffect, useState } from "react";

import CreateRoom from "./CreateRoom";
import Modal from "./Modal";
import NoRoomsView from "./NoRoomsView";
import { RoomType } from "../types";
import RoomsView from "./RoomsView";
import roomChannel from "../channels/room_channel";

const RoomLayout = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);

  const openCreateRoomModal = () => {
    setIsCreateRoomModalOpen(true);
  };

  const closeCreateRoomModal = () => {
    setIsCreateRoomModalOpen(false);
  };

  roomChannel.on("new_room", (response: RoomType) => {
    setRooms([response, ...rooms]);
  });

  // synchronize the socket state.
  useEffect(() => {
    roomChannel.push("sync_rooms", { rooms: rooms });
  }, [rooms]);

  return (
    <div>
      {rooms?.length ? (
        <RoomsView rooms={rooms} openCreateRoomModal={openCreateRoomModal} />
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
