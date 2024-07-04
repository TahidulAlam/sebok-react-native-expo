import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";

const DoctorProfile = () => {
  const { id } = useLocalSearchParams();
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchDoctorDetailsById = async (id) => {
      try {
        const response = await fetch(
          `https://chikitsha-hub-server.vercel.app/doctors/${id}`
        );
        const data = await response.json();
        setDoctorDetails(data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    if (id) {
      fetchDoctorDetailsById(id);
    }
  }, [id]);

  if (!doctorDetails) {
    return (
      <ActivityIndicator
        size="large"
        color="#55AD9B"
        className="flex-1 justify-center"
      />
    );
  }

  const handleCallNow = () => {
    setModalVisible(true);
  };

  const initiateCall = (phoneNumber) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch((err) =>
      console.error("Error opening phone URL", err)
    );
  };

  return (
    <View className="flex-1 p-5 bg-green-100">
      {/* <Text>{id}</Text> */}
      <View className="bg-white rounded-xl">
        <Image
          contentFit="cover"
          style={{ width: 200, height: 200, borderRadius: 10, margin: 10 }}
          source={{ uri: doctorDetails.img }}
        />
        <View className="bg-white p-5 rounded-md">
          <Text className="text-xl mb-1 text-slate-950">
            {doctorDetails.name}
          </Text>
          <Text className="text-lg mb-1 text-slate-950">
            {doctorDetails.degree ? doctorDetails.degree : "M.B.B.S"}
          </Text>

          <Text className="text-lg mb-1 text-slate-950">
            Specialties: {doctorDetails.specialties}
          </Text>
          <Text className="text-lg mb-1 text-slate-950">
            Bmdc Number: {doctorDetails.bmdcNumber}
          </Text>
          <Text className="text-lg mb-1 text-slate-950">
            Address: {doctorDetails.location}
          </Text>
          <Text className="text-lg mb-1 text-slate-950">
            Phone Number: {doctorDetails.phoneNumber || "019XXXXXXXXX"}
          </Text>
        </View>
      </View>
      <View className="flex-1 items-center mt-4">
        <TouchableOpacity onPress={handleCallNow}>
          <View className="w-36 items-center p-5 bg-[#55AD9B] rounded-lg">
            <View className="flex-row gap-1">
              <Ionicons name="call" size={24} color="white" />
              <Text className="text-lg font-bold text-white">Call Now</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
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
          <View className="bg-white p-5 rounded-lg items-center">
            <Text className="text-lg font-bold mb-2">
              Call {doctorDetails.name}
            </Text>
            <Text className="text-lg mb-4">
              Phone Number: {doctorDetails.phoneNumber || "019XXXXXXXXX"}
            </Text>
            <Pressable
              className="bg-[#55AD9B] p-3 rounded-lg"
              onPress={() => {
                setModalVisible(!modalVisible);
                initiateCall(doctorDetails.phoneNumber || "019XXXXXXXXX");
              }}
            >
              <Text className="text-white font-bold">Call Now</Text>
            </Pressable>
            <Pressable
              className="mt-2"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text className="text-blue-500">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DoctorProfile;
