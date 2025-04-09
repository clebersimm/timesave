import { View } from "react-native";


export default function RadioGroupInput({ children }: { children: React.ReactNode }) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = {
    container: {
        marginHorizontal: 8,
        marginVertical: 8,
        paddingLeft: 8,
    },
};