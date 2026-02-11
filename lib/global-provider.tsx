import React, { createContext, ReactNode, useContext } from "react";
import { getCurrentUser } from "./appwrite"; // Assuming this is the function to get the current user
import { useAppwrite } from "./useAppwrite"; // Assuming you have a custom hook for Appwrite

// Define the type for the GlobalContext
interface GlobalContextType {
  isLogged: boolean;
  user: any; // Replace `any` with the actual user type if available
  loading: boolean;
  refetch: (newParams: Record<string, string | number>) => Promise<void>;
}

// Create the GlobalContext
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Define the GlobalProvider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  // Determine if the user is logged in
  const isLogged = !!user;

  // Debugging: Log the user data
  console.log(JSON.stringify(user, null, 2));

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
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
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};