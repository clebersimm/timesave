import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return <PaperProvider theme={DefaultTheme}>
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="task/[id]" options={{ title:"Details" }} />
      <Stack.Screen name="newtask/index" options={{ title:"New Task" }} />
    </Stack>
    <StatusBar style="inverted" networkActivityIndicatorVisible />
  </PaperProvider>

}