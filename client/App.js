import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./src/redux/store.js";
import AppWrapped from "./AppWrapped";
import { StripeProvider } from '@stripe/stripe-react-native'; 
import { LogBox } from 'react-native';
import { Root } from 'popup-ui'
import CustomAlertComponent from "./src/Wrappers/CustomAlert.js";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
      <StripeProvider publishableKey='pk_test_51LIhHqGv8AEygBrRyJ33qbsZN0YWhpj5AJM6W0MHlK9uPXHaYv9IA9YYEtPgLxx9pO3l0fzMZMhGXa5HKS1bCyKB00Fsn7S6pq'>
        <NavigationContainer>
        <Root>
          <AppWrapped />
        </Root>
        </NavigationContainer>
        </StripeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
