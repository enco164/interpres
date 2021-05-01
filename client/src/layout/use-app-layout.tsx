import React, { useContext } from "react";

const AppLayoutContext = React.createContext<{
  menuItems: JSX.Element | null;
  setMenuItems: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
}>({
  menuItems: null,
  setMenuItems: () => {},
});

export const useAppLayout = () => useContext(AppLayoutContext);

const useProvideAppLayout = () => {
  const [menuItems, setMenuItems] = React.useState<JSX.Element | null>(null);

  return { menuItems, setMenuItems };
};

export const AppLayoutProvider: React.FC = ({ children }) => {
  const value = useProvideAppLayout();
  return (
    <AppLayoutContext.Provider value={value}>
      {children}
    </AppLayoutContext.Provider>
  );
};
