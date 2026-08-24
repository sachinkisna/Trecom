export default function Rating({
  value,
  reviews,
}: {
  value: number;
  reviews?: number;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="#d49a36" stroke="#d49a36" strokeWidth="1.5">
        <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
      </svg>
      <span className="text-sm font-bold text-slate-900">{value.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className="text-xs text-slate-400">({reviews} reviews)</span>
      )}
    </span>
  );
}
