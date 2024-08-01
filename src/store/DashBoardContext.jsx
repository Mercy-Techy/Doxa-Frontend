import { createContext, useContext, useState } from "react";

const DashBoardContext = createContext({
  text: { heading: "", subHeading: "" },
  collectionFn: () => {},
  documentFn: () => {},
  accountFn: () => {},
  databaseFn: () => {},
});

export const DashBoardProvider = ({ children }) => {
  const [text, setText] = useState({
    heading: "Database",
    subHeading: "all Database",
  });
  const collectionFn = () =>
    setText({ heading: "Collections", subHeading: "all Collections" });
  const databaseFn = () =>
    setText({ heading: "Database", subHeading: "all Database" });
  const documentFn = () =>
    setText({ heading: "Documents", subHeading: "all Documents" });
  const accountFn = () =>
    setText({ heading: "Account", subHeading: "your Account" });
  const value = { text, collectionFn, documentFn, accountFn, databaseFn };

  return (
    <DashBoardContext.Provider value={value}>
      {children}
    </DashBoardContext.Provider>
  );
};

export const useText = () => {
  return useContext(DashBoardContext);
};
