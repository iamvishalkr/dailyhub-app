import React from "react";
import type { TextInputProps } from "react-native-paper";
import { TextInput } from "react-native-paper";

export function M3Input({ className, style, ...props }: TextInputProps) {
  return (
    <TextInput
      mode="outlined"
      // contentStyle={{padding:0, margin:0}}
      // outlineStyle={{backgroundColor:"#00000000", height:40, }}
      label={""}
      // render={props =>
      //     <T
      //       {...props}
      //     />
      //   }
      //   placeholderTextColor={String(ss)}
      //   className={`${
      //     className ?? ""
      //   }`}
      style={[
        { fontFamily: "SpaceMono", height: 40, justifyContent: "center" },
        style,
      ]}
      {...props}
    />
  );
}
