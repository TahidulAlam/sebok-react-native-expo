import React, { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <View className="flex-row p-2.5 items-center justify-center">
      <TextInput
        className="flex-1 h-10 border border-gray-300 px-2.5 bg-white rounded-l-lg"
        placeholder="Search by doctor name, medical, area , diseases ..."
        value={query}
        onChangeText={setQuery}
      />
      <Pressable
        className="h-10 w-10 bg-green-500 items-center justify-center rounded-r-lg"
        onPress={handleSearch}
      >
        <Icon name="search" size={20} color="#fff" />
      </Pressable>
    </View>
  );
};

export default SearchBox;
