import { M3View } from "@/components/ui/M3View";

import EmptyState from "@/components/EmptyState";
import { Card, CardHeader } from "@/components/ui/Card";
import { useJournalStore } from "@/zustand/journal.store";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Appbar from "@/components/Appbar";
import { M3Text } from "@/components/ui/M3Text";
import { Link } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

const JournalPage = () => {
  const { journals } = useJournalStore();
  return (
    <View style={{ flex: 1 }}>
      <Appbar
        title="Journal"
        right={
          <View className="flex-row gap-4">
            <Link href="/journal/settings">
              <MaterialCommunityIcons name="cog" color={"#fff"} size={24} />
              {/* <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button> */}
            </Link>
            <Link href="/journal/add">
              <MaterialCommunityIcons name="plus" color={"#fff"} size={24} />
              {/* <Button className="flex items-center gap-1">
              <Plus className="w-4 h-4" /> Create
            </Button> */}
            </Link>
          </View>
        }
      />
      <M3View style={{ flex: 1 }}>
        {journals.length > 0 && <FlatList
          data={journals}
          keyExtractor={(j) => String(j.id)}
          renderItem={({ item: journal }) => {
            const dateObj = new Date(journal.dateMs);
            const formattedDate = dateObj.toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <View className="py-2 px-3">
                <Link href={`/journal/view/${journal.id}`}>
                <Card className="w-full">
                  <CardHeader>
                  <M3Text className="font-medium text-sm text-muted-foreground">
                    {formattedDate}
                  </M3Text>
                  <M3Text className="line-clamp-3 text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                    {journal.content}
                  </M3Text>
                  </CardHeader>
                </Card>
              </Link>
              </View>
            );
          }}
        />}

        {/* {journals.map((journal) => {
          const dateObj = new Date(journal.dateMs);
          const formattedDate = dateObj.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <Link href={`./journal/view/${journal.id}`} key={journal.id}>
              <Card className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer flex flex-col gap-2">
                <Text className="font-medium text-sm text-muted-foreground">
                  {formattedDate}
                </Text>
                <Text className="line-clamp-3 text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                  {journal.content}
                </Text>
              </Card>
            </Link>
          );
        })} */}

        {journals.length === 0 && (
          <View className="p-4">
            <EmptyState
            Logo="file-edit"
            title="No journal entries yet."
            subtitle="Start writing your thoughts today!"
            btnText="Create Journal"
            link="journal/add"
          />
          </View>
        )}
      </M3View>
    </View>
  );
};

export default JournalPage;

const styles = StyleSheet.create({});
