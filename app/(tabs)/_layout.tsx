import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MD3Colors } from "react-native-paper";

export default function TabLayout() {
    return (
        <>
            <StatusBar style="inverted" />
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: MD3Colors.primary30,
                    tabBarInactiveTintColor: MD3Colors.secondary30,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Tasks',
                        headerShown: true,
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="home" color={color} size={24} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="historic"
                    options={{
                        title: 'Historic',
                        headerShown: true,
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="history" color={color} size={24} />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}