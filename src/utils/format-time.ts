export function formatTime(timeSeconds: number) {
  const hours = Math.floor(timeSeconds / 3600);
  const minutes = Math.floor(timeSeconds / 60);
  const seconds = timeSeconds % 60;

  if (minutes === 0) {
    return `${seconds < 10 ? "0" : ""}${seconds}`;
  }
  return `${hours !== 0 ? `${hours < 10 ? "0" : ""}${hours}:` : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
