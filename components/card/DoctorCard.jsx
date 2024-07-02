import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DocModal from "../docmodal/DocModal";

const DoctorCard = ({ id, image, name, degree, address }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCallPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View className="bg-[#F1F8E8] rounded-xl overflow-hidden m-2.5 flex-row items-center p-2.5 w-[90%]">
      <Image
        source={{ uri: image }}
        className="w-25 h-25 rounded-full mr-2.5"
      />
      <View className="flex-1">
        <Text className="text-lg font-bold text-black">{name}</Text>
        <Text className="text-sm text-gray-600">{degree}</Text>
        <Text className="text-xs text-gray-700">{address}</Text>
        <View className="flex-row mt-2.5 gap-2.5">
          <Link href={`/doctor/${id}`}>
            <View className="flex-row items-center bg-green-500 p-2.5 rounded-md mr-2.5">
              <Icon name="user" size={16} color="#fff" />
              <Text className="text-white ml-1.25">See Profile</Text>
            </View>
          </Link>
          <Pressable
            className="flex-row items-center bg-green-500 p-2.5 rounded-md"
            onPress={handleCallPress}
          >
            <Icon name="phone" size={16} color="#fff" />
            <Text className="text-white ml-1.25">Call Now</Text>
          </Pressable>
        </View>
      </View>
      <DocModal visible={modalVisible} onClose={closeModal} />
    </View>
  );
};

export default DoctorCard;
