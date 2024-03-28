import React, { useState } from "react";

import CreateRoom from "./CreateRoom";
import Modal from "./Modal";

const NoRoomsView = () => {
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);

  const openCreateRoomModal = () => {
    setIsCreateRoomModalOpen(true);
  };

  const closeCreateRoomModal = () => {
    setIsCreateRoomModalOpen(false);
  };

  return (
    <div className="bg-white">
      <h3 className="text-xl text-[#41A080] font-bold mt-8 text-center">
        ChatPhoenix
      </h3>

      <section className="flex flex-col h-[calc(100vh_-_60px)] justify-center items-center gap-y-10">
        <div className="text-center max-w-[23rem]">
          <h5 className="font-semibold text-black text-xl">No Rooms Yet</h5>

          <p className="mt-4 text-sm text-black">
            Looks like there are no rooms buzzing yet. Let's create one and get
            the party started!
          </p>
        </div>

        <button className="btn" onClick={openCreateRoomModal}>
          Create room
        </button>
      </section>

      <Modal isOpen={isCreateRoomModalOpen} close={closeCreateRoomModal}>
        <CreateRoom close={closeCreateRoomModal} />
      </Modal>
    </div>
  );
};

export default NoRoomsView;
