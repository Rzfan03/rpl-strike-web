export function formatTime(seconds: number): string {
  if (!seconds || seconds < 0) return "Baru join";
  if (seconds < 60) return `${seconds} detik`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit`;
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} jam ${remainingMinutes} menit`;
}