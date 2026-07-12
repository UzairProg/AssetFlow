const Divider = () => {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
        OR
      </span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  )
}

export default Divider
