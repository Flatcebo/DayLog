import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/RootStack';
import {LogContextProvider} from './contexts/LogContext';
import {SearchContextProvider} from './contexts/SearchContext';
import {UserContextProvider} from './contexts/UserContext';

const App = () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <SearchContextProvider>
          <LogContextProvider>
            <RootStack />
          </LogContextProvider>
        </SearchContextProvider>
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default App;
