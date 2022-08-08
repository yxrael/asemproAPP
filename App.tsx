import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MyDrawer } from './src/navigators/Drawer';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { NegociosProvider } from './src/context/NegociosContext';


const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <NegociosProvider>
        { children }
        </NegociosProvider>
    </AuthProvider>
  )
}

const App = () => {

  const { status } = useContext( AuthContext );

  return (
    <NavigationContainer>
      <AppState>
        <MyDrawer />
        {/* <Navigator /> */}
        </AppState>
    </NavigationContainer>    
  );
}

export default App;

