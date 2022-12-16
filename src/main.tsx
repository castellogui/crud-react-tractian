import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "../src/styles/index.css";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "react-query";
import configStore from "../src/store/store.config";

const store = configStore;
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
);
