import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { taskService } from "@/src/services/TaskService";

export interface CreditInfoProps {
  updatedAt: Date;
}

export default function CreditInfo({ updatedAt }: CreditInfoProps) {
  const [data, setData] = useState({
    credit: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const output = await taskService.getTotalCredit();
        setData({ credit: output });
      } catch (error) {
        console.error("Error fetching credit data:", error);
      }
    };
    fetchData();
  }, [updatedAt]); // Fetch data whenever `updatedAt` changes

  return (
    <View style={style.container}>
      <View style={style.box}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Crédito</Text>
        <Text>{data.credit}</Text>
      </View>
      <View style={style.box}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Débitos</Text>
        <Text>30</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  box: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9", // A variant of white
  },
});