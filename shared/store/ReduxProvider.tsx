"use client";

import store from ".";
import { Provider } from "react-redux";

function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
