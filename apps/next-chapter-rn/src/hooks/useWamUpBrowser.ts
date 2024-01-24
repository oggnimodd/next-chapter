import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";

const useWamUpBrowser = () => {
  // If on the browser return
  if (Platform.OS === "web") {
    return;
  }

  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

export default useWamUpBrowser;
