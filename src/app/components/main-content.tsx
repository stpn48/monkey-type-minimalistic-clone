import { TypingField } from "@/app/components/typing-field/typing-field";
import { CapsLockAlert } from "./caps-lock-alert";
import { ConfigBar } from "./config-bar/config-bar";
import { Timer } from "./typing-field/timer";

export function MainContent() {
  return (
    <main className="flex flex-col px-20">
      <ConfigBar />

      <div className="relative flex h-[100px] w-full items-center">
        <Timer />
        <CapsLockAlert />
      </div>

      <TypingField />
    </main>
  );
}
