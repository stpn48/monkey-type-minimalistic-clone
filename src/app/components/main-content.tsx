import { TypingField } from "@/app/components/typing-field/typing-field";
import { ConfigBar } from "./config-bar/config-bar";

export function MainContent() {
  return (
    <main className="flex w-full flex-col">
      <ConfigBar />
      <TypingField />
    </main>
  );
}
