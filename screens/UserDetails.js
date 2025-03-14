import { useContext, useLayoutEffect } from "react";
import { AppContext } from "../store/app-context";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import Seperator from "../components/Seperator";
import { LinearGradient } from "expo-linear-gradient";

export default function UserDetails() {
  const { currentUser } = useContext(AppContext);
  const navigation = useNavigation();

  if (!currentUser) {
    return (
      <LinearGradient
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
        colors={[
          "rgba(215, 236, 250, 1)",
          "rgba(239, 239, 255, 1)",
          "rgba(255, 235, 253, 1)",
        ]}
      >
        <Text>An Error Occured</Text>
      </LinearGradient>
    );
  }

  const formattedBirthDay = format(
    new Date(currentUser.date_of_birth),
    "MMMM d, yyyy"
  );

  useLayoutEffect(() => {
    if (currentUser) {
      navigation.setOptions({
        title: currentUser.first_name + " " + currentUser.last_name,
      });
    }
  }, [currentUser]);

  const data = {
    general: [
      { fieldName: "ID", value: currentUser.id },
      { fieldName: "UID", value: currentUser.uid },
      { fieldName: "First Name", value: currentUser.first_name },
      { fieldName: "Last Name", value: currentUser.last_name },
      { fieldName: "Username", value: currentUser.username },
      { fieldName: "Email", value: currentUser.email },
      { fieldName: "Password", value: currentUser.password, encrypted: true },
      { fieldName: "Phone Number", value: currentUser.phone_number },
      {
        fieldName: "Social Insurance Number",
        value: currentUser.social_insurance_number,
      },
      { fieldName: "Birth Day", value: formattedBirthDay },
    ],

    employment: [
      { fieldName: "Title", value: currentUser.employment.title },
      { fieldName: "Key Skill", value: currentUser.employment.key_skill },
    ],

    address: [
      { fieldName: "City", value: currentUser.address.city },
      { fieldName: "Street Name", value: currentUser.address.street_name },
      {
        fieldName: "Street Address",
        value: currentUser.address.street_address,
      },
      { fieldName: "ZIP Code", value: currentUser.address.zip_code },
      { fieldName: "State", value: currentUser.address.state },
      { fieldName: "Country", value: currentUser.address.country },
      { fieldName: "Latitude", value: currentUser.address.coordinates.lat },
      { fieldName: "Longitude", value: currentUser.address.coordinates.lng },
    ],

    credit_card: [
      {
        fieldName: "Card Number",
        value: currentUser.credit_card.cc_number,
      },
    ],

    subscription: [
      { fieldName: "Plan", value: currentUser.subscription.plan },
      { fieldName: "Status", value: currentUser.subscription.status },
      {
        fieldName: "Payment Method",
        value: currentUser.subscription.payment_method,
      },
      { fieldName: "Term", value: currentUser.subscription.term },
    ],
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[
        "rgba(215, 236, 250, 1)",
        "rgba(239, 239, 255, 1)",
        "rgba(255, 235, 253, 1)",
      ]}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
      </View>
      <ScrollView>
        <Seperator category={"General"} data={data.general} key={`general`} />
        <Seperator
          category={"Employment"}
          data={data.employment}
          key={"employment"}
        />
        <Seperator category={"Address"} data={data.address} key={"address"} />
        <Seperator
          category={"Credit Card"}
          data={data.credit_card}
          key={"credit-card"}
        />
        <Seperator
          category={"Subscription"}
          data={data.subscription}
          key={"subscription"}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
});
