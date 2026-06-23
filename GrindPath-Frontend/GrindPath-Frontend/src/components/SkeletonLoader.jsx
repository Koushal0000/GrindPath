const SkeletonLoader = ({ type = "card" }) => {
  if (type === "timeline") {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-2.5 bg-zinc-800 rounded w-1/4" />
              <div className="h-2 bg-zinc-800 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === "list") {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-12 bg-zinc-800/50 rounded-xl" />
        ))}
      </div>
    )
  }

  // Default card
  return (
    <div className="glass-card rounded-3xl p-6 border-zinc-800 bg-zinc-900/30 animate-pulse">
      <div className="flex gap-2 mb-4">
        <div className="w-12 h-4 bg-zinc-800 rounded-full" />
        <div className="w-16 h-4 bg-zinc-800 rounded-full" />
      </div>
      <div className="h-5 bg-zinc-800 rounded w-3/4 mb-4" />
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="h-8 bg-zinc-800 rounded-xl" />
        <div className="h-8 bg-zinc-800 rounded-xl" />
      </div>
      <div className="h-2 bg-zinc-800 rounded-full w-full" />
    </div>
  )
}

export default SkeletonLoader
