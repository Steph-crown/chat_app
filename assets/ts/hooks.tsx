import React from "react";
import RoomLayout from "./components/RoomLayout";
import mount from "./mount";

type CustomHooks = {
  RoomLayout: {};
};

const Hooks = {} as CustomHooks;

Hooks.RoomLayout = {
  mounted() {
    this.unmount = mount(this.el.id, <RoomLayout />);
  },

  destroyed() {
    if (!this.unmount) {
      console.error(`${this.el.id} component is not rendered`);
    } else {
      this.unmount();
    }
  },
};

export default Hooks;
