import { ConfigBar } from "@/app/components/configBar/config-bar";
import { TypingField } from "@/app/components/typing-field";

export function MainContent() {
  return (
    <main className="w-full">
      <ConfigBar />
      <TypingField />
    </main>
  );
}
