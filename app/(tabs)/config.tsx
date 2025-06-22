import { useTaskContext } from "@/src/context/TaskContext";
import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Config() {
    const { fetchTags } = useTaskContext();

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text>Config</Text>
        </View>
    );
}