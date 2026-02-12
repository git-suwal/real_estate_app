import React, { createContext, ReactNode, useContext } from "react";
import { getCurrentUser } from "./appwrite"; // Assuming this is the function to get the current user
import { useAppwrite } from "./useAppwrite"; // Assuming you have a custom hook for Appwrite


interface User{
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

// Create the GlobalContext
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Define the GlobalProvider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    loading,
    refetch: rawRefetch,
  } = useAppwrite<User | null, Record<string, never>>({
    fn: getCurrentUser,
    params: {},
  });
  const refetch = () => rawRefetch({});


  // Determine if the user is logged in
  const isLoggedIn = !!user;

  // Debugging: Log the user data
  console.log(JSON.stringify(user, null, 2));

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;