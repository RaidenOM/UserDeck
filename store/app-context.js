import axios from "axios";
import { Alert } from "react-native";

const { createContext, useEffect, useState } = require("react");

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://random-data-api.com/api/users/random_user?size=80"
        );
        setUsers(response.data);
        setCurrentUser(response.data[0]);
      } catch (error) {
        Alert.alert("Error", "An error occured while fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AppContext.Provider
      value={{ users, loading, currentUser, index, setIndex, setCurrentUser }}
    >
      {children}
    </AppContext.Provider>
  );
}
