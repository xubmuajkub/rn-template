import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Auth: AuthStackParamList;
  Tab: TabParamList;
};
export type AuthStackParamList = {
  GettingStarted: any;
} & SharedParamList;

export type TabParamList = {
  HomeTab: HomeStackParamList;
  Tab1Tab: Tab1StackParamList;
  Tab2Tab: Tab2StackParamList;
  Tab3Tab: Tab3StackParamList;
};

export type HomeStackParamList = {
  Home: undefined;
} & ChildStackParamList;

export type Tab1StackParamList = {
  Tab1: undefined;
} & ChildStackParamList;

export type Tab2StackParamList = {
  Tab2: undefined;
} & ChildStackParamList;

export type Tab3StackParamList = {
  Tab3: {tab: number} | undefined;
} & ChildStackParamList;

export type ChildStackParamList = {} & SharedParamList;

export type SharedParamList = {
  SampleShared: undefined;
};

export type HomeScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;

export type Tab1ScreenProps<T extends keyof Tab1StackParamList> =
  NativeStackScreenProps<Tab1StackParamList, T>;

export type Tab2ScreenProps<T extends keyof Tab2StackParamList> =
  NativeStackScreenProps<Tab2StackParamList, T>;

export type Tab3ScreenProps<T extends keyof Tab3StackParamList> =
  NativeStackScreenProps<Tab3StackParamList, T>;

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type TabScreenProps<T extends keyof TabParamList> = BottomTabScreenProps<
  TabParamList,
  T
>;

export type AppRootNativeStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
