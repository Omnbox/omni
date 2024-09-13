import { blurhash } from "@/constants/hash";
import { Product } from "@/products";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Image } from "expo-image";
import {
  Pressable,
  ScrollView,
  SectionList,
  SectionListData,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CarouselCardItem from "./UI/CarouselCardItem";

interface ItemsListProps {
  sections: SectionListData<Product, { data: Product[]; title: string }>[];
  categories: {
    title: string;
    thumbnail: string;
  }[];
}

export default function ItemsList({ sections, categories }: ItemsListProps) {
  const {
    colors: { primary, background },
  } = useTheme();
  const navigation = useNavigation();
  return (
    <SectionList
      sections={sections}
      horizontal
      ListHeaderComponent={
        <View className="p-4">
          <View>
            <Text>special offers</Text>
            <Text className="" style={{ color: primary }}>
              see all
            </Text>
          </View>
          <View className="p-4 aspect-video w-full bg-gray-500/25">
            <CarouselCardItem
              images={[
                "https://picsum.photos/seed/696/3000/2000",
                "https://picsum.photos/seed/696/3000/2000",
                "https://picsum.photos/seed/696/3000/2000",
              ]}
            />
          </View>
          <View>
            <Text>categories</Text>
            <Text className="" style={{ color: primary }}>
              see all
            </Text>
          </View>
          <ScrollView horizontal>
            {categories.map(({ thumbnail, title }) => (
              <TouchableOpacity className="flex flex-col gap-4 items-center justify-center">
                <Image
                  className="flex-1 rounded-full bg-gray-500/25"
                  source={thumbnail}
                  placeholder={{ blurhash }}
                  contentFit="cover"
                  transition={1000}
                />
                <Text>{title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      }
      ListFooterComponent={<View className="p-4" />}
      renderSectionHeader={({ section }) => (
        <View className="flex-row justify-between items-center">
          <Text>{section.title}</Text>
          <Text className="" style={{ color: primary }}>
            see all
          </Text>
        </View>
      )}
      renderItem={({ item: { id, image, price } }) => {
        return (
          <Pressable
            onPress={() => {
              //@ts-ignore
              navigation.navigate("ItemModal", {
                params: {
                  id,
                },
              });
            }}
            className="rounded-md shadow-md w-[50%] aspect-square"
          >
            <Image
              className="flex-1 w-full bg-gray-500/25"
              source={image[0]}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
            <View className="p-4 " style={{ backgroundColor: background }}>
              <Text className="">
                <Text>k</Text>
                <Text>{price}</Text>
                <Text>.00</Text>
              </Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
}
