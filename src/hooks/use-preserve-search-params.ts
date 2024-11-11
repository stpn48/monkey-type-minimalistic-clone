import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function usePreserveSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateWithParams = useCallback(
    (newPath: string) => {
      const params = new URLSearchParams(searchParams as any);

      router.push(`${newPath}?${params.toString()}`);
    },
    [router, searchParams],
  );

  return { navigateWithParams };
}
