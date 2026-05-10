export default function PsiScoreBadge({ score }: { score: number | null | undefined }) {
  if (score == null) return <span className="text-xs text-muted-foreground">—</span>;
  const color =
    score >= 90 ? "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30"
    : score >= 50 ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30"
    : "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30";
  return (
    <span className={`inline-flex items-center justify-center w-10 h-7 rounded-md border text-xs font-bold ${color}`}>
      {score}
    </span>
  );
}