import { View } from "react-native";
import { Button } from "react-native-paper";

export default function CompleteTaskButton({ actionHandler }: { actionHandler: Function }) {
    return (
        <View>
            <Button
                icon="check"
                mode="contained"
                onPress={() => actionHandler()}
            >
                Complete
            </Button>
        </View>
    );
}