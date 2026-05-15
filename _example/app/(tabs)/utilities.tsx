import Appbar from "@/components/Appbar";
import MaterialDesignIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

import { View } from "react-native";

type LinkType = {
  id: number;
  title: string;
  link: string;
  icon: React.JSX.Element;
};

export default function UtilitiesScreen() {
  const router = useRouter();
  const numColumns = 2;
  const size = Dimensions.get("window").width / numColumns;

  const data: LinkType[] = [
    {
      id: 1,
      title: "Expense",
      link: "/",
      icon: (
        <MaterialDesignIcons
          name="cash-register"
          size={28}
          style={{ textAlign: "center", marginTop: 10 }}
        />
      ),
    },
    {
      id: 2,
      title: "Cart Calculator",
      link: "/",
      icon: (
        <MaterialDesignIcons
          name="cart-arrow-down"
          size={28}
          style={{ textAlign: "center", marginTop: 10 }}
        />
      ),
    },
    {
      id: 3,
      title: "Password Manager",
      link: "/",
      icon: (
        <MaterialDesignIcons
          name="form-textbox-password"
          size={28}
          style={{ textAlign: "center", marginTop: 10 }}
        />
      ),
    },
    {
      id: 4,
      title: "Lofi Radio",
      link: "/",
      icon: (
        <MaterialDesignIcons
          name="music-note"
          size={28}
          style={{ textAlign: "center", marginTop: 10 }}
        />
      ),
    },
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
        <Appbar title="Utilities" />
        <ScrollView>
        <View style={styles.container}>
          {data.map((item, i) => (
            <RenderCard key={i} item={item} />
          ))}
        </View>
      </ScrollView>
      {/* <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderCard}
          keyExtractor={(item) => String(item.id)}
          numColumns={numColumns}
        />
      </View> */}
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
