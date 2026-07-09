const AILoading = () => {
  return (
    <div className="flex items-start gap-3 max-w-3xl mr-auto">
      {/* Avatar */}
      <div className="shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-sm shadow-lg shadow-blue-600/20 mt-1">
        🤖
      </div>

      {/* Bubble */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3.5 min-w-[120px]">
        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">GrindPath AI</p>
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-400 text-xs font-medium">Thinking</span>
          <span className="flex gap-0.5 items-end">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AILoading
