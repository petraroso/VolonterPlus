import { createContext, useContext } from "react";

type ContextType = {
  admin: boolean;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AdminContext = createContext<ContextType | undefined>(undefined);

//to handle values being unknown
//custom hook
export function useAdminContext() {
  const adminData = useContext(AdminContext);
  if (adminData === undefined) {
    throw new Error("useAdminContext must be used with AdminContext");
  }
  return adminData;
}
