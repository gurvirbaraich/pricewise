import { Dispatch, SetStateAction, createContext, useState } from "react";

type AppContextProps = {
  appNotification: string | null;
  setAppNotification: Dispatch<SetStateAction<string | null>>;
};

export const AppContext = createContext<AppContextProps>({
  appNotification: null,
  setAppNotification: () => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appNotification, setAppNotification] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ appNotification, setAppNotification }}>
      {children}
    </AppContext.Provider>
  );
}
