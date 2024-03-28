import NoRoomsView from "./components/NoRoomsView";
import React from "react";
import mount from "./mount";

type CustomHooks = {
  NoRoomsView: {};
};

const Hooks = {} as CustomHooks;

Hooks.NoRoomsView = {
  mounted() {
    this.unmount = mount(this.el.id, <NoRoomsView />);
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
