const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="font-medium text-slate-600">© 2026 AssetFlow</p>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span>Version 1.0.0</span>
          <span>Production</span>
          <span>Build 2026.07</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
