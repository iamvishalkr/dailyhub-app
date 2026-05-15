import Appbar from "@/components/Appbar";
import MaterialDesignIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

import { View } from "react-native";

type LinkType = {
  id: number;
  title: string;
  link: string;
  icon: React.JSX.Element;
};

export default function HomeScreen() {
  const router = useRouter();
  const numColumns = 2;
  const size = Dimensions.get("window").width / numColumns;

  const data: LinkType[] = [
    {
      id: 1,
      title: "Streaks",
      link: "./streaks",
      icon: (
        <MaterialDesignIcons
          name="fire"
          size={28}
          style={{ textAlign: "center", marginTop: 10 }}
        />
      ),
    },
    {
      id: 2,
      title: "Todos",
      link: "./todos",
      icon: (
        <MaterialDesignIcons
          name="format-list-checks"
          size={28}
          style={{ textAlign: "center", marginTop: 10 }}
        />
      ),
    },
    {
      id: 3,
      title: "Journal",
      link: "./journal",
      icon: (
        <MaterialDesignIcons
          name="notebook"
          size={28}
          style={{ textAlign: "center", marginTop: 10 }}
        />
      ),
    },
    {
      id: 4,
      title: "Pills",
      link: "./pills",
      icon: (
        <MaterialDesignIcons
          name="pill"
          size={28}
          style={{ textAlign: "center", marginTop: 10 }}
        />
      ),
    },
    {
      id: 5,
      title: "Focus Counter",
      link: "./focus-counter",
      icon: (
        <MaterialDesignIcons
          name="timer-outline"
          size={28}
          style={{ textAlign: "center", marginTop: 10 }}
        />
      ),
    }
  ];

  const RenderCard = ({ item }: { item: LinkType }) => {
    return (
      <View
        style={{
          width: "50%",
          padding: 8,
          height: size,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.navigate(item.link as unknown as any);
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              borderWidth: 1,
              borderRadius: 16,
            }}
          >
            <View>
              <Text style={{ fontSize: 24, textAlign: "center" }}>
                {item.title}
              </Text>
              {item.icon}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <View style={{ flex: 1 }}>
      <Appbar title="DailyHub" />
      <ScrollView>
        <View style={styles.container}>
          {data.map((item, i) => (
            <RenderCard key={i} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
