import { useCallback, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import { Stack, useRouter, useGlobalSearchParams } from "expo-router";

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";

import { COLORS, SIZES, icons } from "../../constants";
import useFetchWithID from "../../hooks/useFetchWithID";

const tabs = ["About", "Qualifications", "Responsibilities", "Benefits"];

const JobDetails = () => {
  const params = useGlobalSearchParams();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { data, error, isLoading, refetch } = useFetchWithID({ id: params.id });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [refetch]);

  const displayTabContent = () => {
    console.log(activeTab);
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );

      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );

      case "Benefits":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_benefits ?? ["N/A"]}
          />
        );
      case "About":
        return (
          <JobAbout info={data[0].job_description ?? "No data provided"} />
        );
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,

          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              icon="arrow-left"
              dimesion="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              icon="arrow-left"
              dimesion="60%"
            />
          ),
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text> Something went Wrong</Text>
          ) : data.length === 0 ? (
            <Text> Np Data Found</Text>
          ) : (
            <>
              <Company
                companyLogo={data[0]?.employer_logo}
                companyName={data[0]?.employer_name}
                jobTitle={data[0]?.job_title}
                location={data[0]?.job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </>
          )}
        </ScrollView>
        <JobFooter
          url={
            data[0]?.job_google_link ||
            "https://careers.google.com/jobs/results/"
          }
        />
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
