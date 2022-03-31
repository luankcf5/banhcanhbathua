import React, { useState } from "react";

export const AppContext = React.createContext();
export default function AppProvider({ children }) {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <AppContext.Provider
      value={{
        modalVisible,
        setModalVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
