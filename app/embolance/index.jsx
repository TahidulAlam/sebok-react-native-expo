import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const defaultImg = "https://i.ibb.co/FBdRkGZ/doctor-9722572.png";
  const router = useRouter();

  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        const data = require("../../assets/ambulanceData.json");
        setAmbulances(data);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching ambulances:", error);
        setLoading(false);
      }
    };

    fetchAmbulances();
  }, []);

  const handleCallNow = (ambulance) => {
    setSelectedAmbulance(ambulance);
    setModalVisible(true);
  };

  const makeCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const renderAmbulanceItem = ({ item }) => (
    <View className="flex-row items-center bg-white p-3 mb-2 rounded-lg">
      <Image
        source={{ uri: defaultImg }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <View className="ml-3 flex-1 flex-row">
        <View>
          <Text className="text-lg font-semibold">{item.name}</Text>
          <Text className="text-sm text-gray-600">{item.phone}</Text>
          <Text className="text-sm text-gray-600">{item.location}</Text>
          <Text
            className={`text-sm ${
              item.availability === "Available"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {item.availability}
          </Text>
        </View>
        <View className="flex-1 justify-center items-end mr-5">
          <TouchableOpacity
            title="Call Now"
            onPress={() => handleCallNow(item)}
          >
            <View className="items-center p-3 bg-[#55ad9b4b] rounded-full">
              <View className="flex-row gap-1">
                <Ionicons name="call" size={24} color="#55AD9B" />
                {/* <Text className="text-lg font-bold text-white">Call Now</Text> */}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-green-100 p-5">
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search Ambulance..."
        className="h-12 border-none rounded-md px-4 bg-white mb-2"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#55AD9B" />
      ) : (
        <FlatList
          windowSize={6}
          // scrollIndicatorInsets={false}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          data={ambulances.filter(
            (ambulance) =>
              ambulance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              ambulance.location
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAmbulanceItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View className="bg-white p-5 rounded-lg shadow">
            <Text className="text-lg font-bold mb-2">Call Ambulance</Text>
            {selectedAmbulance && (
              <>
                <Text className="mb-4">
                  Are you sure you want to call {selectedAmbulance.name}?
                </Text>
                <View className="flex-row gap-2 justify-center items-center">
                  <Pressable
                    className="bg-[#55AD9B] p-3 rounded-lg text-white font-bold"
                    title={`Call ${selectedAmbulance.phone}`}
                    onPress={() => makeCall(selectedAmbulance.phone)}
                  >
                    <Text className="text-white font-bold">Call Now</Text>
                  </Pressable>
                  <Pressable
                    title="Cancel"
                    onPress={() => setModalVisible(false)}
                  >
                    <Text className="text-blue-500">Cancel</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Index;
