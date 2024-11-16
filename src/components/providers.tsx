import { ReactQueryProvider } from "@/components/react-query-provider";
import { ConfigStateProvider } from "@/context/use-config-state";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      defaultTheme="light"
      attribute="class"
      themes={["light", "dark", "norse", "mountain"]}
    >
      <ReactQueryProvider>
        <NuqsAdapter>
          <ConfigStateProvider>{children}</ConfigStateProvider>
        </NuqsAdapter>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
