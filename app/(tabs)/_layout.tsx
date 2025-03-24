import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
    return (
        <>
            <StatusBar style="inverted" />
            <Tabs
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Atividades',
                        headerShown: true
                    }}
                />
                <Tabs.Screen
                    name="historic"
                    options={{
                        title: 'Histórico',
                        headerShown: true
                    }}
                />
            </Tabs>
        </>
    );
}