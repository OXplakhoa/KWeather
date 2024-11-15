import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';
import Fontisto from '@expo/vector-icons/Fontisto';
import { StatusBar } from "expo-status-bar";
import dayjs from "dayjs";

const {width: SCREEN_WIDTH} = Dimensions.get("window");
const API_KEY = "8f63b0f21591bad5bd1a39eb583f51b2"

const icons:any= {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Rain: "rains",
  Drizzle: "day-rain",
  Thunderstorm: "lightning",
};

export default function Index() {
  const [city,setCity] = useState("Loading...");
  const [days,setDays] = useState([])
  const [ok,setOk] = useState(true);
  const getWeather = async () => {
    const {granted} =  await Location.requestForegroundPermissionsAsync()
    if(!granted){
      setOk(false);
    }
    const {coords: {latitude,longitude}}= await Location.getCurrentPositionAsync({accuracy: 5})
    const location = await Location.reverseGeocodeAsync({latitude,longitude})
    setCity(location[0].city ?? "Unknown");
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
      if (!res.ok) {
        console.error('API response error:', res.status);
        return;
      }
      const json = await res.json();
      // console.log(JSON.stringify(json, null, 2));
      const daily = json.list.filter((weather: { dt_txt: string }) => {
        if (weather.dt_txt.includes("00:00:00")) {
          return weather;
        }
      });
      setDays(daily);
      console.log(JSON.stringify(daily,null,2));
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  useEffect(() => {
    getWeather()
  },[])
  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <View style={styles.city}> 
        <View style={styles.cityContainer}>
          <Text style={styles.cityName}>
            {city}
          </Text>
        </View>
      </View>
      <ScrollView 
        pagingEnabled 
        horizontal  
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        { days.length === 0 ? (
          <View style={styles.day}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
        ) : (
          days.map((day:any,idx) => 
            <View style={styles.day} key={idx}>
          <View style={styles.row}>
            <View style={styles.stats}>
              <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}</Text>
              <Text style={styles.time}>{dayjs.unix(day.dt).format('dddd, D MMMM YYYY')}</Text>
            </View>
            <View style={styles.icon}>
              <Fontisto name={icons[day.weather[0].main]} size={100} color="black" />
              <Text style={styles.summary}>{day.weather[0].main}</Text>
              <Text style={styles.description}>{day.weather[0].description}</Text>
            </View>
          </View>
        </View>
        ))}
      </ScrollView>                                                                                     
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b1fa06",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 12, 
  },
  cityName: {
    fontSize: 64, 
    fontWeight: "bold",
    color: "#333", 
    textAlign: "center",
    overflow: "hidden",
  },
  cityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  weather: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingVertical: 10,
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1, 
  },
  temp: {
    marginBottom: 8,
    fontSize: 100,
    fontWeight: "700",
    color: "#444", 
  },
  time: {
    fontSize: 30,
    fontWeight: "500",
    color: "#555", 
  },
  summary: {
    fontSize: 28,
    color: "#333",
    fontWeight: "500",
    marginTop: 8,
  },
  description: {
    fontSize: 20,
    color: "#666", 
    fontWeight: "400",
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 12, // Added space between sections
  },
  stats: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingRight: 16,
  },
  icon: {
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
