import { DefaultTheme, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useTaskContext } from "@/src/context/TaskContext";

export default function CreditInfo() {
  const { totalCredit, totalDebit } = useTaskContext();
  const total = totalCredit - totalDebit;
  const totalLabelColor = total > 0 ? style.labelCredit : total < 0 ? style.labelDebit : style.labelZero; // Green for positive, red for negative, black for zero

  return (
    <View style={style.container}>
      <View style={[style.box, style.boxColorCredit]}>
        <Text style={[style.labelStyle, style.labelCredit]}>Credit</Text>
        <Text variant="titleLarge">{totalCredit}</Text>
      </View>
      <View style={[style.box, style.boxColorDebit]}>
        <Text style={[style.labelStyle, style.labelDebit]}>Debits</Text>
        <Text variant="titleLarge">{totalDebit}</Text>
      </View>
      <View style={[style.box]}>
        <Text style={[style.labelStyle, totalLabelColor]}>Total</Text>
        <Text variant="titleLarge">{total}</Text>
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
    borderColor: "#000",
    padding: 8,
    borderRadius: 8,
    backgroundColor: DefaultTheme.colors.background,
  },
  labelStyle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  labelCredit: {
    color: "#008000", // Dark green for credit
  },
  labelDebit: {
    color: "#ff0000", // Red for debit
  },
  labelZero: {
    color: "#000000", // Black for zero
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