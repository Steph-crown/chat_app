import React, { FC } from "react";

import { RoomType } from "../types";

type Props = {
  rooms: RoomType[];
};

const RoomsView: FC<Props> = () => {
  return <div>RoomsView</div>;
};

export default RoomsView;
