import React, {useContext, createContext, useState} from 'react';

const UserContext: any = createContext(null);

export function UserContextProvider({children}: any) {
  const [user, setUser]: any = useState(null);
  const [name, setName]: any = useState(null);
  return (
    <UserContext.Provider
      children={children}
      value={{
        user,
        setUser,
        name,
        setName,
      }}
    />
  );
}

export function useUserContext() {
  const userContext: any = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext.Provider is not found');
  }
  return userContext;
}
