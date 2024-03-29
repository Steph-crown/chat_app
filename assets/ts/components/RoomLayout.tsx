import React, { useState } from "react";

import NoRoomsView from "./NoRoomsView";
import { RoomType } from "../types";
import RoomsView from "./RoomsView";

const RoomLayout = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);

  return (
    <div>
      {rooms?.length > 0 ? <RoomsView rooms={rooms} /> : <NoRoomsView />}
    </div>
  );
};

export default RoomLayout;
