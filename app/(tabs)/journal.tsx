
import EmptyState from "@/components/EmptyState";
import { useJournalStore } from "@/zustand/journal.store";
import { Card } from "react-native-paper";

import Appbar from "@/components/Appbar";
import { Link, useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { IconButton, Surface, Text } from "react-native-paper";

const JournalPage = () => {
  const { journals } = useJournalStore();
  const router = useRouter()
  return (
    <Surface style={{ flex: 1 }}>
      <Appbar
        title="Journal"
        right={
          <View className="flex-row">
            <IconButton mode="contained-tonal" icon={"cog"} size={24} onPress={()=>{
                router.push("/journal/settings")
            }}/>
            <IconButton mode="contained-tonal" icon={"plus"} size={24} onPress={()=>{
                router.push("/journal/add")
            }}/>
            
          </View>
        }
      />
      <View style={{ flex: 1 }}>
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
                <Card className="w-full" mode="outlined">
                  <Card.Content>
                  <Text className="font-medium text-sm text-muted-foreground">
                    {formattedDate}
                  </Text>
                  <Text className="line-clamp-3 text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                    {journal.content}
                  </Text>
                  </Card.Content>
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
            onPress={()=>{
                router.push("/journal/add")
            }}
          />
          </View>
        )}
      </View>
    </Surface>
  );
};

export default JournalPage;

const styles = StyleSheet.create({});
