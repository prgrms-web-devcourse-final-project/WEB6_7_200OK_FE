export function ImageLabelOverlay({ label }: { label: string }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-zinc-950/50"
      aria-hidden="true"
    >
      <span className="text-xl font-semibold text-zinc-50">{label}</span>
    </div>
  );
}
