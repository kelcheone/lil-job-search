import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./nearbyjobcard.style";
import { checkImageURL } from "../../../../utils";

const NearbyJobCard = ({ job, handleNavigate }) => {
  const defaultImage =
    "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg";
  return (
    job && (
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleNavigate(job)}
      >
        <TouchableOpacity style={styles.logoContainer}>
          <Image
            source={{ uri: job.employer_logo || defaultImage }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.jobName} numberOfLines={1}>
            {job.job_title}
          </Text>
          <View style={styles.infoWrapper}>
            <Text style={styles.publisher}>{job?.job_publisher} -</Text>
            <Text style={styles.jobType}> {job.job_employment_type}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  );
};

export default NearbyJobCard;
