import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

const AllDoctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultImg = "https://i.ibb.co/FBdRkGZ/doctor-9722572.png";

  useEffect(() => {
    async function fetchDoctors() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://chikitsha-hub-server.vercel.app/doctors/search?searchTerm=${searchTerm}`
        );
        const data = await response.json();
        setDoctors(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching doctors:", error);
        setLoading(false);
      }
    }
    fetchDoctors();
  }, [searchTerm]);

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const renderDoctorCard = ({ item }) => (
    <View className="bg-white rounded-lg p-2 mb-2 mx-5">
      <View className="flex-row">
        <Image
          source={{ uri: item.img || defaultImg }}
          className="w-20 h-20 rounded-lg mr-2"
        />
        <View>
          <Text className="text-lg font-semibold">{item.name}</Text>
          <Text className="text-sm text-gray-600">{item.specialties}</Text>
          <Text className="text-sm text-gray-600">
            Location: {item.location}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-green-100 p-2.5">
      <View className="my-2.5">
        <TextInput
          className="h-12 border border-gray-300 rounded-md px-2 bg-white"
          placeholder="Search doctor's"
          value={searchTerm}
          onChangeText={handleSearch}
        />
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#55AD9B"
          className="flex-1 justify-center"
        />
      ) : (
        <FlatList
          data={doctors}
          renderItem={renderDoctorCard}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={{ paddingVertical: 5 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default AllDoctors;
