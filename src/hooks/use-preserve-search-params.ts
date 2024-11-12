import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function usePreserveSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateWithParams = useCallback(
    (newPath: string, method: "push" | "replace" = "push") => {
      const params = new URLSearchParams(searchParams as any);

      if (method === "push") {
        router.push(`${newPath}?${params.toString()}`);
      } else if (method === "replace") {
        router.replace(`${newPath}?${params.toString()}`);
      }
    },
    [router, searchParams],
  );

  return { navigateWithParams };
}
