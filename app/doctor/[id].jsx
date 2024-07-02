// app/doctor/[id]/index.js
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DoctorProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch doctor details based on the ID, for now, using a mock function
  const doctorDetails = fetchDoctorDetailsById(id);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor Profile</Text>
      <Text style={styles.info}>Name: {doctorDetails.name}</Text>
      <Text style={styles.info}>Degree: {doctorDetails.degree}</Text>
      <Text style={styles.info}>Address: {doctorDetails.address}</Text>
      {/* Add more doctor details here */}
    </View>
  );
};

const fetchDoctorDetailsById = (id) => {
  // Replace with actual data fetching logic
  const doctorsData = require("../../assets/DoctorList.json");
  return doctorsData.find((doctor) => doctor.id === id) || {};
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#D8EFD3",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DoctorProfile;
