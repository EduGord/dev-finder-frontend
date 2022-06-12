/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// BEGIN ROOT
export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Home: NavigatorScreenParams<HomeTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootTabParamList = {
  Authenticate: undefined;
  PasswordRecovery: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
// END ROOT


export type HomeStackParamList = {
  Home: NavigatorScreenParams<HomeTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type HomeTabParamList = {
  Index: undefined;
  TabTwo: undefined;
};

export type HomeTabScreenProps<Screen extends keyof HomeTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, Screen>,
    NativeStackScreenProps<HomeStackParamList>
    >;