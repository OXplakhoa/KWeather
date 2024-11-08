import { StyleSheet, Text, View } from "react-native";
import { rgbaColor } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "crimson",
  }
})
