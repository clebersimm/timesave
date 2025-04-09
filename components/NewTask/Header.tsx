import { Stack } from "expo-router";
import { Appbar } from "react-native-paper";

export default function NewTaskHeader() {
    return (
        <Stack.Screen
            name="newtask/index"
            options={{
                header: () => (
                    <Appbar.Header>
                        <Appbar.BackAction onPress={() => { }} />
                        <Appbar.Content title="New Task" />
                        <Appbar.Action icon="content-save" onPress={() => { }} />
                    </Appbar.Header>
                ),
            }}
        />

    );
}

