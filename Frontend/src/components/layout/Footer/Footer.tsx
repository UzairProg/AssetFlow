const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© 2026 AssetFlow</p>
        <div className="flex flex-wrap items-center gap-4">
          <span>Version 1.0.0</span>
          <span>Production</span>
          <span>Build 2026.07</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
