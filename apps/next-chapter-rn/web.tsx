import React from "react";
import { AppRegistry } from "react-native";
// import ReactDOM from "react-dom/client";
import App from "./App";
import "./web.css";

// start: inject icons used by react-native-paper
// @ts-expect-error
import iconFont from "react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf";
const iconFontStyles = `@font-face { src: url(${iconFont}); font-family: MaterialCommunityIcons; }`;
const style = document.createElement("style");
style.appendChild(document.createTextNode(iconFontStyles));
document.head.appendChild(style);
// end: inject icons used by react-native-paper

const Root = () => <App />;

const rootTag = document.getElementById("root");
AppRegistry.registerComponent("App", () => Root);
AppRegistry.runApplication("App", { rootTag });
