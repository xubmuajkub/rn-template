import {
  CommonActions,
  EventConsumer,
  EventEmitter,
  NavigationAction,
  NavigationContainerEventMap,
  NavigationProp,
  NavigationState,
  ParamListBase,
  PartialState,
  PrivateValueStore,
  Route,
} from '@react-navigation/native';

let _navigator:
  | ({
      dispatch(
        action:
          | NavigationAction
          | ((state: NavigationState) => NavigationAction),
      ): void;
      navigate: {
        <RouteName extends keyof ParamListBase>(
          ...args: undefined extends ParamListBase[RouteName]
            ? [RouteName] | [RouteName, ParamListBase[RouteName]]
            : [RouteName, ParamListBase[RouteName]]
        ): void;
        <RouteName extends keyof ParamListBase>(
          route:
            | {key: string; params?: ParamListBase[RouteName]}
            | {name: RouteName; key?: string; params: ParamListBase[RouteName]},
        ): void;
      };
      reset(state: PartialState<NavigationState> | NavigationState): void;
      goBack(): void;
      isFocused(): boolean;
      canGoBack(): boolean;
      dangerouslyGetParent<T = NavigationProp<ParamListBase> | undefined>(): T;
      dangerouslyGetState(): NavigationState;
    } & PrivateValueStore<ParamListBase, keyof ParamListBase, {}> &
      EventEmitter<{}> & {
        setParams<RouteName extends keyof ParamListBase>(
          params: Partial<ParamListBase[RouteName]>,
        ): void;
      } & EventConsumer<NavigationContainerEventMap> & {
        resetRoot(
          state?: PartialState<NavigationState> | NavigationState,
        ): void;
        getRootState(): NavigationState;
        getCurrentRoute(): Route<string> | undefined;
        getCurrentOptions(): object | undefined;
      })
  | null;

function setTopLevelNavigator(
  navigatorRef:
    | ({
        dispatch(
          action:
            | NavigationAction
            | ((state: NavigationState) => NavigationAction),
        ): void;
        navigate: {
          <RouteName extends keyof ParamListBase>(
            ...args: undefined extends ParamListBase[RouteName]
              ? [RouteName] | [RouteName, ParamListBase[RouteName]]
              : [RouteName, ParamListBase[RouteName]]
          ): void;
          <RouteName extends keyof ParamListBase>(
            route:
              | {key: string; params?: ParamListBase[RouteName]}
              | {
                  name: RouteName;
                  key?: string;
                  params: ParamListBase[RouteName];
                },
          ): void;
        };
        reset(state: PartialState<NavigationState> | NavigationState): void;
        goBack(): void;
        isFocused(): boolean;
        canGoBack(): boolean;
        dangerouslyGetParent<
          T = NavigationProp<ParamListBase> | undefined,
        >(): T;
        dangerouslyGetState(): NavigationState;
      } & PrivateValueStore<ParamListBase, keyof ParamListBase, {}> &
        EventEmitter<{}> & {
          setParams<RouteName extends keyof ParamListBase>(
            params: Partial<ParamListBase[RouteName]>,
          ): void;
        } & EventConsumer<NavigationContainerEventMap> & {
          resetRoot(
            state?: PartialState<NavigationState> | NavigationState,
          ): void;
          getRootState(): NavigationState;
          getCurrentRoute(): Route<string> | undefined;
          getCurrentOptions(): object | undefined;
        })
    | null,
) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params?: any) {
  // @ts-ignore
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
    }),
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};
