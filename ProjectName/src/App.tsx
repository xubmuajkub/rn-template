import 'react-native-reanimated';
import 'react-native-gesture-handler';
import 'intl-pluralrules';
import 'moment/min/locales';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {ThemeProvider} from '@rneui/themed';
import React from 'react';
import {I18nextProvider} from 'react-i18next';
import {ClickOutsideProvider} from 'react-native-click-outside';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {useDeviceContext} from 'twrnc';

import AppContainer from '@/core/AppContainer';
import AppToastProvider from '@/core/AppToastProvider';
import {rneuiTheme, tw} from '@/libs';
import i18next from '@/localization';
import RootNavigator from '@/navigation/RootNavigation';
import {fcmService} from '@/services/FcmService';
import NavigationService from '@/services/navigationService';
import store from '@/store';
import {RootStackParamList} from '@/types';

function App() {
  const navigation =
    React.useRef<NavigationContainerRef<RootStackParamList>>(null);

  React.useEffect(() => {
    SplashScreen.hide();
    fcmService.requestPermission(() => null);
  }, []);

  useDeviceContext(tw);
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <I18nextProvider i18n={i18next}>
          <Provider store={store}>
            <ClickOutsideProvider>
              <ThemeProvider theme={rneuiTheme}>
                <AppToastProvider>
                  <BottomSheetModalProvider>
                    <AppContainer>
                      <NavigationContainer
                        ref={navigatorRef => {
                          NavigationService.setTopLevelNavigator(navigatorRef);
                          // @ts-ignore
                          navigation.current = navigatorRef;
                        }}>
                        <RootNavigator />
                      </NavigationContainer>
                    </AppContainer>
                  </BottomSheetModalProvider>
                </AppToastProvider>
              </ThemeProvider>
            </ClickOutsideProvider>
          </Provider>
        </I18nextProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
