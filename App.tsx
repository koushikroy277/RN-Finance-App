import React from 'react';
import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import Context from './src/app/context/Context';
import Home from './src/app/pages/Home/Home';
import {lightGreen} from './src/app/color';

const App: React.FC = () => {
  return (
    <>
      <SafeAreaView>
        <Context>
          <StatusBar backgroundColor={lightGreen} />
          <Home />
        </Context>
      </SafeAreaView>
    </>
  );
};

export default App;
