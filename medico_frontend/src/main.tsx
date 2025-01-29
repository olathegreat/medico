import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./utils/store.ts";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext.tsx";
import { Toaster } from "./components/ui/sonner.tsx";


createRoot(document.getElementById("root")!).render(
  
    <BrowserRouter>
    

    
      <Provider store={store}>
      <SocketProvider>
        <App  />
        <Toaster visibleToasts={1} position="top-right" richColors  closeButton/>
        </SocketProvider>
      </Provider>

     
    </BrowserRouter>

);
