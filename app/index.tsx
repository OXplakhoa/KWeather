import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const {width: SCREEN_WIDTH} = Dimensions.get("window");

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Ho Chi Minh</Text>
      </View>
      <ScrollView 
        pagingEnabled 
        horizontal  
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
         <Text style={styles.temp}> 27 </Text>
         <Text style={styles.description}> Sunny </Text>
        </View>
        <View style={styles.day}>
         <Text style={styles.temp}> 27 </Text>
         <Text style={styles.description}> Sunny </Text>
        </View>
        <View style={styles.day}>
         <Text style={styles.temp}> 27 </Text>
         <Text style={styles.description}> Sunny </Text>
        </View>
        <View style={styles.day}>
         <Text style={styles.temp}> 27 </Text>
         <Text style={styles.description}> Sunny </Text>
        </View>
      </ScrollView>                                                                                     
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff4a2b",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  }
  ,
  weather: {

  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 178
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  }
})
