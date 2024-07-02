import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

const Index = () => {
  const url = "https://chat.openai.com/chat"; // Double-check the URL

  return (
    <View className="flex-1 bg-[#D8EFD3]">
      <WebView source={{ uri: url }} className="flex-1" />
    </View>
  );
};

export default Index;
