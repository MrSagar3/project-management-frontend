export function timeRemaining(dueDate: string): string {
  const now: number = new Date().getTime();
  const due: number = new Date(dueDate).getTime();
  const diff: number = due - now;

  if (diff <= 0) {
    return "The due date has passed!";
  }

  const days: number = Math.floor(diff / (1000 * 60 * 60 * 24));

  return `${days} days remaining`;
}
