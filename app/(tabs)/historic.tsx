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
      <View style={{ flexDirection: "row", paddingStart: 10, paddingTop: 10 }}>
        <View style={{ flex: 1 }}>
          <Text>
        Description
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>
        End date
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
