import { createRoot } from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { App } from "@/app/App.tsx"
import { HashRouter } from "react-router"

createRoot(document.getElementById("root")!).render(
  // <BrowserRouter>
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  // </BrowserRouter>,
)
