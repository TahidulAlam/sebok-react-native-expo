import { Image } from "expo-image";
import { useLocalSearchParams, useRouter, useSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

const DoctorProfile = () => {
  const { id } = useLocalSearchParams();
  const [doctorDetails, setDoctorDetails] = useState(null);

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
            Phone Number:019XXXXXXXXX
          </Text>
        </View>
      </View>
      {/* <Text className="text-2xl font-bold mb-5">Doctor Profile</Text> */}
      {/* Add more doctor details here */}
    </View>
  );
};

export default DoctorProfile;
