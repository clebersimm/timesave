import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useTaskContext } from "@/src/context/TaskContext";

export default function CreditInfo() {
  const { totalCredit, totalDebit } = useTaskContext();
  const total = totalCredit - totalDebit;
  const totalColor = total > 0 ? style.boxColorCredit : total < 0 ? style.boxColorDebit : style.boxColorZero; // Green for positive, red for negative, black for zero

  return (
    <View style={style.container}>
      <View style={[style.box, style.boxColorCredit]}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Credit</Text>
        <Text>{totalCredit}</Text>
      </View>
      <View style={[style.box, style.boxColorDebit]}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Debits</Text>
        <Text>{totalDebit}</Text>
      </View>
      <View style={[style.box, totalColor]}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Total</Text>
        <Text>{total}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10,
  },
  box: {
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#000",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9", // A variant of white
  },
  boxColorDebit: {
    borderColor: "#ff0000", // Red for debit
  },
  boxColorCredit: {
    borderColor: "#008000", // Dark green for credit
  },
  boxColorZero: {
    borderColor: "#000000", // Black for zero
  }

});