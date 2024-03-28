import React, { ReactNode } from "react";

import { createRoot } from "react-dom/client";

const mount = (id: string, component: ReactNode) => {
  const container = document.getElementById(id);

  const root = createRoot(container as Element);
  root.render(<React.StrictMode>{component}</React.StrictMode>);

  return () => {
    root.unmount();
  };
};

export default mount;
