import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>  
    <Stack>
      <Stack.Screen 
      name="index"
      options={{
        headerShown: false,
        // title: "Home",
        // headerStyle: { backgroundColor: "#25293e" }, 
        // headerTintColor: "white", 
        // headerTitleStyle: { fontSize: 24 }, 
        // contentStyle: { backgroundColor: "#ffffff" },
      }}
      />
    </Stack>
    </>
  );
}
