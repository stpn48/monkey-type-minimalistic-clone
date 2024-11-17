import { LoaderPinwheel } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex h-screen w-screen flex-col items-center justify-center gap-10 font-geist-mono">
      <LoaderPinwheel className="size-5 animate-spin text-primary" />
    </div>
  );
}
