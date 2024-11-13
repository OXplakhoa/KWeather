import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';

const {width: SCREEN_WIDTH} = Dimensions.get("window");
const API_KEY = "8f63b0f21591bad5bd1a39eb583f51b2"

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
    const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps: false})
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
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
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
            <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}</Text>
            <Text style={styles.summary}>{day.weather[0].main}</Text>
            <Text style={styles.description}>{day.weather[0].description}</Text>
          </View>)
          )}
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
  summary: {
    marginTop: -30,
    fontSize: 60,
  },
  description: {
    fontSize: 20,
  }
})
