import React from "react";
import { View, Text, Modal, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const DocModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white rounded-lg p-5 items-center shadow-md min-w-[300px]">
          <Text className="text-lg mb-5 text-center">Confirm Call?</Text>
          <View className="flex-row justify-center">
            <Pressable
              className="bg-blue-600 p-2.5 rounded-md mx-2.5"
              onPress={onClose}
            >
              <Text className="text-white">Cancel</Text>
            </Pressable>
            <Pressable className="bg-green-600 flex-row items-center px-3.5 p-2.5 rounded-md mx-2.5">
              <Icon name="phone" size={16} color="#fff" />
              <Text className="text-white ml-1.25">Call</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DocModal;
