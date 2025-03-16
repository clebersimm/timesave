import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {},

            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Atividades'
                }}
            />
            <Tabs.Screen
                name="historic"
                options={{
                    title: 'Histórico'
                }}
            />
        </Tabs>
    );
}