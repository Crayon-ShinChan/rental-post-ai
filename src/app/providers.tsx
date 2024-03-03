// app/providers.tsx
"use client";

import { Provider as JotaiProvider } from "jotai";
import { NextUIProvider } from "@nextui-org/react";

// app/providers.tsx

// app/providers.tsx

// app/providers.tsx

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </JotaiProvider>
  );
}
