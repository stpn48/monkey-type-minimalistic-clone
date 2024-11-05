import { TypingField } from "@/app/components/typing-field";
import { ConfigBar } from "./config-bar/config-bar";

export function MainContent() {
  return (
    <main className="flex h-full w-full flex-col gap-16">
      <ConfigBar />
      <TypingField />
    </main>
  );
}
