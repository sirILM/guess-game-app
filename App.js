import { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { GuessProvider } from "./context/GuessContext";

import AppLoading from "expo-app-loading";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Colors from "./constants/colors";

export default function App() {
  const [screenNum, setScreenNum] = useState(1);
  let screen;

  function changeScreenHandler(num) {
    setScreenNum(num);
  }

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (screenNum === 1) {
    screen = <StartGameScreen onScreenChange={changeScreenHandler} />;
  }

  if (screenNum === 2) {
    screen = <GameScreen onScreenChange={changeScreenHandler} />;
  }

  if (screenNum === 3) {
    screen = <GameOverScreen onScreenChange={changeScreenHandler} />;
  }

  return (
    <GuessProvider>
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>
            <StatusBar />
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </GuessProvider>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
