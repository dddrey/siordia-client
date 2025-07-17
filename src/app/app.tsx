import QueryProvider from "./providers/query/query-provider";
import Router from "./router";
import { Toaster } from "react-hot-toast";
import { TelegramWrapper } from "@/shared/components/wrappers/telegram-wrapper";
import { useEffect } from "react";

function App() {
  return (
    <QueryProvider>
      <TelegramWrapper>
        <Router />
      </TelegramWrapper>
      <Toaster position="top-center" containerStyle={{ marginTop: "80px" }} />
    </QueryProvider>
  );
}

export default App;
