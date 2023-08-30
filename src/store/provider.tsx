"use client";

import { store } from ".";
import { Provider } from "react-redux";

export function ReduxProviders({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
