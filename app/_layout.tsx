import { TaskProvider } from "@/src/context/TaskContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return <PaperProvider theme={DefaultTheme}>
    <TaskProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="task/[id]" options={
            {  
              title: "Details",
              headerTintColor: DefaultTheme.colors.onPrimary,
              headerStyle: {
                backgroundColor: DefaultTheme.colors.primary,
              }
            }
          } />
        <Stack.Screen name="newtask/index" />
      </Stack>
    </TaskProvider>
    <StatusBar style="inverted"
      backgroundColor={DefaultTheme.colors.primary}
      networkActivityIndicatorVisible />
  </PaperProvider>

}