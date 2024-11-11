import { TypingField } from "@/app/components/typing-field/typing-field";
import { ConfigBar } from "./config-bar/config-bar";

export function MainContent() {
  return (
    <main className="mt-10 flex flex-col px-20">
      <ConfigBar />
      <TypingField />
    </main>
  );
}
