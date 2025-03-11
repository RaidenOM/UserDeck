import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Field({ fieldName, value, encrypted }) {
  const [isEncrypted, setIsEncrypted] = useState(encrypted ? true : false);

  return (
    <View style={styles.field}>
      <Text style={styles.fieldName}>{fieldName}</Text>
      <View style={styles.valueEyeContainer}>
        <Text style={styles.fieldValue}>
          {isEncrypted ? "*".repeat(value.length) : value}
        </Text>
        {encrypted && (
          <TouchableOpacity
            onPress={() => setIsEncrypted(!isEncrypted)}
            style={styles.eyeIconContainer}
          >
            <Ionicons
              name={isEncrypted ? "eye" : "eye-off"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    backgroundColor: "#fff",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    marginVertical: 6,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 16,
  },
  fieldName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  fieldValue: {
    fontSize: 16,
    color: "#666",
    marginRight: 8,
  },
  valueEyeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
});
