import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { useDispatch } from "react-redux";

import { signOutUser } from "../../../services/firebase/authService";
import DashboardScreen from "../../screens/Home";
import FavoritesScreen from "../../screens/Favorites";
import HistoryScreen from "../../screens/History";

const Tab = createMaterialTopTabNavigator();

const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Word List" component={DashboardScreen} />
    <Tab.Screen name="History" component={FavoritesScreen} />
    <Tab.Screen name="Favorites" component={HistoryScreen} />
  </Tab.Navigator>
);

const DrawerContent = (props: any) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Sair" onPress={() => signOutUser(dispatch)} />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

function AppStack() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Challenge Koepe" component={Tabs} />
    </Drawer.Navigator>
  );
}

export { AppStack };
