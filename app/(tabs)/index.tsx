import React from "react";
import { StyleSheet, View } from "react-native";
import CreditInfo from "../../components/ui/CreditInfo";
import TodoTable from "../../components/TodoTable/TodoTable";
import FabNewActivity from "../../components/FabNewActivity";

export default function Index() {

  return (
    <View style={{ flex: 1 }}>
      <View style={style.headerContainer}>
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
  },
  headerContainer: {
    height: 90,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  }
});