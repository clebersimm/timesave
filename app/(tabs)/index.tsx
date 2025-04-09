import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CreditInfo from "../../components/ui/CreditInfo";
import TodoTable from "../../components/TodoTable/TodoTable";
import FabNewActivity from "../../components/FabNewActivity";
import { initDatabase } from "@/src/database";
import { Text } from "react-native-paper";

export default function Index() {
  const [dbInitialized, setDbInitialized] = useState(false);
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        // Assuming initDatabase is a function that initializes your database
        await initDatabase();
        setDbInitialized(true);
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };
    initializeDatabase();
  }, []);
  if (dbInitialized === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Initializing Database...</Text>
      </View>
    );
  }
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