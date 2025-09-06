import { FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { DefaultTheme, MD3Colors } from "react-native-paper";

export default function TabLayout() {
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: DefaultTheme.colors.onPrimary,
                    tabBarInactiveTintColor: DefaultTheme.colors.inversePrimary,
                    tabBarStyle: {
                        backgroundColor: DefaultTheme.colors.primary,
                        borderTopWidth: 1,
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Tasks',
                        headerTintColor: DefaultTheme.colors.onPrimary,
                        headerShown: true,
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="clipboard-list" color={color} size={24} />
                        ),
                        headerStyle: {                           
                            backgroundColor: DefaultTheme.colors.primary,
                            borderBottomWidth: 1,
                        },
                    }}
                />
                <Tabs.Screen
                    name="historic"
                    options={{
                        title: 'Completed',
                        headerTintColor: DefaultTheme.colors.onPrimary,
                        headerShown: true,
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="clipboard-check" color={color} size={24} />
                        ),
                        headerStyle: {                           
                            backgroundColor: DefaultTheme.colors.primary,
                            borderBottomWidth: 1,
                        },
                    }}
                />
                <Tabs.Screen
                    name="config"
                    options={{
                        title: 'Config',
                        headerTintColor: DefaultTheme.colors.onPrimary,
                        headerShown: true,
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="cog" color={color} size={24} />
                        ),
                        headerStyle: {                           
                            backgroundColor: DefaultTheme.colors.primary,
                            borderBottomWidth: 1,
                        },
                    }}
                />
            </Tabs>
        </>
    );
}