import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Historic() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Text>
        <TextInput
          label="Description"
        />
      </Text>
    </SafeAreaView>
  );
}
