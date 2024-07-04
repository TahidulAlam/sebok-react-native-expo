import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-green-100 p-5 -mt-28">
      <View>
        <Image
          className="h-16 w-52 p-2 mb-10"
          source={require("../assets/images/sebok-logo-green.png")}
        />
      </View>
      <View className="flex-row justify-around my-5 gap-5">
        <Link href="/doctor">
          <View className="bg-teal-600 w-36 h-36 rounded-xl items-center justify-center mx-2">
            <View className="mb-2">
              <Fontisto name="doctor" size={34} color="white" />
            </View>
            <Text className="text-white text-lg font-bold text-center">
              ডাক্তার
            </Text>
          </View>
        </Link>
        <Link href="/embolance">
          <View className="bg-teal-600 w-36 h-36 rounded-xl items-center justify-center mx-2">
            <View className="mb-2">
              <FontAwesome5 name="ambulance" size={34} color="white" />
            </View>
            <Text className="text-white text-lg font-bold text-center">
              এম্বুলেন্স
            </Text>
          </View>
        </Link>
      </View>

      <View className="flex-row justify-around gap-5">
        <Link href="/blood">
          <View className="bg-teal-600 w-36 h-36 rounded-xl items-center justify-center mx-2">
            <View className="mb-2">
              <MaterialCommunityIcons
                name="blood-bag"
                size={34}
                color="white"
              />
            </View>
            <Text className="text-white text-lg font-bold text-center">
              রক্ত
            </Text>
          </View>
        </Link>
        <Link href="/hospital">
          <View className="bg-teal-600 w-36 h-36 rounded-xl items-center justify-center mx-2">
            <View className="mb-2">
              <FontAwesome name="hospital-o" size={34} color="white" />
            </View>
            <Text className="text-white text-lg font-bold text-center">
              হসপিটাল
            </Text>
          </View>
        </Link>
      </View>
    </View>
  );
}
