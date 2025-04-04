import { View } from "react-native";
import AppFab from "./ui/AppFab";
import DialogNewActity from "./ui/DialogNewActivity";
import { useState } from "react";

export default function FabNewActivity() {

    const [visible, setVisible] = useState(false);
    const showHideHandler = () => {
        console.log('visible')
        setVisible(!visible);
    }

    return (<View>
        <AppFab />
        <DialogNewActity 
            showHideDialog={showHideHandler}
            visible={visible}
        />
    </View>)
}