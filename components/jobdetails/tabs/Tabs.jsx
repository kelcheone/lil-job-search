import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import styles from "./tabs.style";

import { SIZES } from "../../../constants";

const TabButton = ({ name, activeTab, setActiveTab }) => {
  const onHandleSearchType = (name) => {
    setActiveTab(name);
  };

  return (
    <TouchableOpacity
      onPress={() => onHandleSearchType(name)}
      style={styles.btn(activeTab, name)}
    >
      <Text style={styles.btnText(activeTab, name)}>{name}</Text>
    </TouchableOpacity>
  );
};

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={({ item }) => (
          <TabButton
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            name={item}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={{
          columnGap: SIZES.small / 2,
        }}
      />
    </View>
  );
};

export default Tabs;
