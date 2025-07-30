import { useRouter } from "expo-router";

import { FAB } from "react-native-paper";

export default function AppFab() {

    const router = useRouter();

    const fabPressedHandler = () => {
        router.navigate('/newtask');
    }

    return (
        <FAB
            icon="plus"
            onPress={() => fabPressedHandler()}
            label="New Task"
        />
    )
}



