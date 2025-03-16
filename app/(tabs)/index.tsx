import React from "react";
import { StyleSheet, View } from "react-native";
import CreditInfo from "../components/ui/CreditInfo";
import { SafeAreaView } from "react-native-safe-area-context";
import TodoTable from "../components/TodoTable/TodoTable";
import FabNewActivity from "../components/FabNewActivity";

export default function Index() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.creditDebitInfoContainer}>
        <CreditInfo />
      </View>
      <View style={style.contentContainer}>
        <TodoTable />
      </View>
      <FabNewActivity />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  creditDebitInfoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  contentContainer: {
    flex: 8
  }
});