import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import styles from "./welcome.style";

import { icons, SIZES, COLORS } from "../../../constants";

const jobTypesData = ["Full Time", "Part Time", "Remote", "Freelance"];
const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();

  const [activeJobType, setActiveJobType] = useState(jobTypesData[0]);
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Kevin, who is your morning</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job.</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor={COLORS.gray}
            placeholder="Search for jobs"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            style={styles.searchBtnImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypesData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
