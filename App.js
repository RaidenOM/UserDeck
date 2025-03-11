import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import AppProvider, { AppContext } from "./store/app-context";
import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import UserDetails from "./screens/UserDetails";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();

function MainAppStack() {
  const { index, setIndex, setCurrentUser, users } = useContext(AppContext);

  const handlePrevious = () => {
    if (index > 0 && users.length > 0) {
      setIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        setCurrentUser(users[newIndex]);
        return newIndex;
      });
    }
  };

  const handleNext = () => {
    if (index < users.length - 1 && users.length > 0) {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        setCurrentUser(users[newIndex]);
        return newIndex;
      });
    }
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerLeft: ({ tintColor }) => (
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              width: 30,
              height: 30,
              backgroundColor: index === 0 ? "#ccc" : "black",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
            onPress={handlePrevious}
            disabled={index === 0}
          >
            <Ionicons name="chevron-back" color={"white"} size={20} />
          </TouchableOpacity>
        ),

        headerRight: ({ tintColor }) => (
          <TouchableOpacity
            style={{
              marginHorizontal: 10,
              width: 30,
              height: 30,
              backgroundColor: index === 79 ? "#ccc" : "black",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
            }}
            onPress={handleNext}
            disabled={index === 79}
          >
            <Ionicons name="chevron-forward" color="white" size={20} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        component={UserDetails}
        name="UserDetails"
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { loading, currentUser } = useContext(AppContext);

  if (loading || !currentUser) {
    return (
      <>
        <View style={[styles.loadingContainer]}>
          <Image
            source={require("./assets/UserDeck.png")}
            resizeMode="center"
            style={{ height: 400 }}
          />
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={{ marginTop: 20, color: "#7f8c8d" }}>
            Designed by Om Kumar
          </Text>
        </View>
      </>
    );
  }

  return <MainAppStack />;
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
