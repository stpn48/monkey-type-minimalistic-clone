export function formatTime(timeSeconds: number) {
  const minutes = Math.floor(timeSeconds / 60);
  const seconds = timeSeconds % 60;

  if (minutes === 0) {
    return `${seconds < 10 ? "0" : ""}${seconds}`;
  }
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
