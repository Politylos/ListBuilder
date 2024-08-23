import { Text, View } from "react-native";
import {Startup} from "@/app/functions/LoadData";

export default function Index() {
  Startup();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
