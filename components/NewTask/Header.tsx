import { Stack } from "expo-router";
import { Appbar } from "react-native-paper";

export type NewTaskHeaderProps = {
    onSubmit: Function;
    backActionHandler: Function;
}

export default function NewTaskHeader({ onSubmit, backActionHandler }: NewTaskHeaderProps) {
    return (
        <Stack.Screen
            name="newtask/index"
            options={{
                header: () => (
                    <Appbar.Header>
                        <Appbar.BackAction onPress={() => backActionHandler()} />
                        <Appbar.Content title="New Task" />
                        <Appbar.Action icon="content-save" onPress={() => onSubmit()} />
                    </Appbar.Header>
                ),
            }}
        />

    );
}

