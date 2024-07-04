import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  TextInput,
  Text,
  Image,
  Pressable,
} from "react-native";
import debounce from "lodash.debounce";
import { useRouter } from "expo-router";

const AllDoctors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultImg = "https://i.ibb.co/FBdRkGZ/doctor-9722572.png";
  const router = useRouter();

  const fetchDoctors = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://chikitsha-hub-server.vercel.app/doctors/search?searchTerm=${query}`
      );
      const data = await response.json();
      setDoctors(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching doctors:", error);
      setLoading(false);
    }
  };

  const debouncedFetchDoctors = useMemo(() => debounce(fetchDoctors, 300), []);

  useEffect(() => {
    debouncedFetchDoctors(searchTerm);
    return () => {
      debouncedFetchDoctors.cancel();
    };
  }, [searchTerm, debouncedFetchDoctors]);

  const handleSearch = useCallback((query) => {
    setSearchTerm(query);
  }, []);

  const renderDoctorCard = useCallback(
    ({ item }) => (
      <View className="bg-white rounded-lg p-2 mb-4 mx-5">
        <View className="flex-row">
          <Image
            source={{ uri: item.img || defaultImg }}
            className="w-24 rounded-lg mr-4 "
          />
          <View>
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-sm text-gray-600">{item.specialties}</Text>
            <Text className="text-sm text-gray-600">
              Location: {item.location}
            </Text>
            <Pressable
              className="bg-[#55AD9B] w-20 p-1 mt-1 mb-1 rounded-md"
              onPress={() => router.push(`/doctor/doctorProfile/${item._id}`)}
            >
              <Text className="font-semibold text-white text-center">
                See Profile
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    ),
    [router]
  );

  return (
    <View className="flex-1 bg-green-100 p-2.5">
      <View className="my-2.5 mx-5">
        <TextInput
          className="h-12 border-none rounded-md px-4 bg-white"
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
