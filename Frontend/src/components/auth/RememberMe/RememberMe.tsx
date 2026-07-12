type RememberMeProps = {
  checked: boolean
  onChange: (checked: boolean) => void
}

const RememberMe = ({ checked, onChange }: RememberMeProps) => {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
      <span className="relative inline-flex h-5 w-5 items-center justify-center rounded border border-slate-300 bg-white">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <span className="h-2.5 w-2.5 rounded bg-blue-900 opacity-0 transition peer-checked:opacity-100" />
      </span>
      Remember me on this device
    </label>
  )
}

export default RememberMe
