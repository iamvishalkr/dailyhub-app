import { useJournalStore } from "@/zustand/journal.store";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Button, IconButton, Surface, Text } from "react-native-paper";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogMedia,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import Appbar from "@/components/Appbar";
import { M3Input } from "@/components/ui/M3Input";
import { showToast } from "@/utils/showToast";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewJournalScreen = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const { journals, updateJournal, deleteJournal } = useJournalStore();
  const navigation = useNavigation();

  const journalId = Number(id);
  const journal = journals.find((j) => j.id === journalId);

  const [content, setContent] = useState("");

  useEffect(() => {
    if (journal) {
      setContent(journal.content);
    }
  }, [journal]);

  if (!journal) {
    return (
      <View className="flex-1 flex-col items-center justify-center">
        <Text variant="titleMedium">Journal not found.</Text>
        <View>
          <Button onPress={() => {}}>Go Back</Button>
        </View>
      </View>
    );
  }

  const handleSave = () => {
    updateJournal(journalId, { content });
    showToast("Journal updated!");
  };

  const handleDelete = () => {
    deleteJournal(journalId);
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
    showToast("Journal deleted!");
    // window.history.back();
  };

  const dateStr = new Date(journal.dateMs).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Surface className="flex-1">
      <Appbar
        title={dateStr}
        right={
          <IconButton
            mode="contained-tonal"
            icon={"delete"}
            size={24}
            onPress={handleDelete}
          />
        }
      />
      {/* <View className="h4 mb-0">{dateStr}</View> */}
      {/* <DeleteBtnDialog handleOk={handleDelete} /> */}

      <SafeAreaView className="flex-1" edges={["bottom"]}>
        <View className="h-80_ p-4">
          <M3Input
            style={{ height: 400 }}
            multiline={true}
            numberOfLines={8}
            textAlignVertical="top"
            value={content}
            onChangeText={(value) => setContent(value)}
          />

          <View className="mt-4 flex justify-end">
            <Button mode="contained" onPress={handleSave}>
              {/* <Save className="w-4 h-4 mr-2" />  */}Save Changes
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Surface>
  );
};

export default ViewJournalScreen;

const styles = StyleSheet.create({});

// const DeleteBtnDialog = ({ handleOk }: { handleOk: () => void }) => {
//   const [open, setOpen] = useState(false);
//   useEffect(() => {
//     const onHashChange = () => {
//       setOpen(window.location.hash === "#dialogJournalDelete");
//     };

//     window.addEventListener("hashchange", onHashChange);
//     return () => window.removeEventListener("hashchange", onHashChange);
//   }, []);
//   return (
//     <AlertDialog
//       open={open}
//       onOpenChange={(openState) => {
//         if (openState) {
//           window.location.hash = "#dialogJournalDelete";
//         } else {
//           if (window.location.hash === "#dialogJournalDelete") {
//             history.back();
//           }
//         }
//       }}
//     >
//       <AlertDialogTrigger asChild>
//         <Button
//           variant={"destructive"}
//           onClick={() => {
//             window.location.hash = "dialogJournalDelete";
//           }}
//         >
//           <Trash2 /> Delete
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent size="sm">
//         <AlertDialogHeader>
//           <AlertDialogMedia className="bg-primary">
//             <Trash2 />
//           </AlertDialogMedia>
//           <AlertDialogTitle>Delete</AlertDialogTitle>
//           <AlertDialogDescription>
//             Are You Sure To Delete? It cannot be undone!
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction onClick={handleOk}>Delete</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };
