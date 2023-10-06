import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./store/auth";
import ProtectedApp from "./ProtectedApp";

const store = configureStore();

function App() {

  useEffect(() => {
      store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <ProtectedApp />
    </Provider>
  );
}

export default App;
