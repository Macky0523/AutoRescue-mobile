import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, TouchableOpacity } from "react-native";
import axios from "../plugins/axios";
import { useNavigation } from "@react-navigation/native";
import { Card, ListItem, Icon } from "react-native-elements";

function LandingPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("accounts/users/me", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigation.navigate("/");
        }
      });
  }, []);

  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("post/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post("/accounts/token/logout/", null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      localStorage.removeItem("token");
      navigation.navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handleGoToRequestPage = () => {
    navigation.navigate("/booking");
  };

  const handleDeleteRequest = async (requestId) => {
    try {
      const response = await axios.delete(`post/${requestId}/`);
      console.log(response.data);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (error) {
      console.log("Error deleting request:", error);
    }
  };

  const RequestCard = ({ request }) => {
    return (
      <Card key={request.id} containerStyle={{ marginBottom: 10 }}>
        <Text>Requester: {firstName} {lastName}</Text>
        <Text>Problem: {request.Problem}</Text>
        <Text>Info: {request.Additional_Info}</Text>
        <Text>Location: {request.user_loc}</Text>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => handleDeleteRequest(request.id)}
        >
          <Icon name="delete" color="red" />
        </TouchableOpacity>
      </Card>
    );
  };

  const RequestList = () => {
    return (
      <ScrollView style={{ maxHeight: 400 }}>
        {requests
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((request) => (
            <RequestCard request={request} />
          ))}
      </ScrollView>
    );
  };

  const EmptyRequestList = () => {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text>No requests available</Text>
      </View>
    );
  };

  const RequestListComponent = requests.length ? RequestList : EmptyRequestList;

  return (
    <View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, textAlign: "center" }}>User Profile</Text>
        <Card>
          <Text>Welcome! {firstName}, {lastName}</Text>
          <Text>Rating: 5/5</Text>
        </Card>
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, textAlign: "center" }}>Booking</Text>
        <TouchableOpacity
          style={{ backgroundColor: "blue", padding: 10, margin: 10 }}
          onPress={handleGoToRequestPage}
        >
          <Text style={{ color: "white" }}>Request</Text>
        </TouchableOpacity>
        <RequestListComponent />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, textAlign: "center" }}>Messages</Text>
        {/* Add messages content here */}
      </View>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

export default LandingPage;
