import React from "react";
import { StyleSheet, View } from "react-native";
import CreditInfo from "../components/ui/CreditInfo";
import { SafeAreaView } from "react-native-safe-area-context";
import TodoTable from "../components/TodoTable/TodoTable";
import FabNewActivity from "../components/FabNewActivity";

export default function Index() {

  return (
    <View style={{ flex: 1 }}>
      <View>
        <CreditInfo />
      </View>
      <View style={style.contentContainer}>
        <TodoTable />
      </View>
      <FabNewActivity />
    </View>
  );
}

const style = StyleSheet.create({
  contentContainer: {
    flex: 1
  }
});