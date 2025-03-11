import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Field from "./Field";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Seperator({ category, data }) {
  const [shown, setShown] = useState(true);
  return (
    <>
      <TouchableOpacity
        style={styles.seperator}
        onPress={() => setShown((prevShown) => !prevShown)}
      >
        <Text style={styles.seperatorText}>{category}</Text>
        <Ionicons
          name={shown ? "caret-up-circle" : "caret-down-circle"}
          size={20}
          color="#686869"
        />
      </TouchableOpacity>
      {shown &&
        data &&
        data.length > 0 &&
        data.map((d) => (
          <Field
            fieldName={d.fieldName}
            value={d.value}
            encrypted={d.encrypted}
            key={`${category}-${d.fieldName}`}
          />
        ))}
    </>
  );
}

const styles = StyleSheet.create({
  seperator: {
    marginTop: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  seperatorText: {
    color: "#686869",
  },
});
