import { Check } from 'lucide-react'

const strengthRules = [
  { label: '8 characters', test: (value: string) => value.length >= 8 },
  { label: 'Uppercase', test: (value: string) => /[A-Z]/.test(value) },
  { label: 'Lowercase', test: (value: string) => /[a-z]/.test(value) },
  { label: 'Number', test: (value: string) => /[0-9]/.test(value) },
  { label: 'Special Character', test: (value: string) => /[^A-Za-z0-9]/.test(value) },
]

type PasswordStrengthProps = {
  value: string
}

const PasswordStrength = ({ value }: PasswordStrengthProps) => {
  const completed = strengthRules.filter((rule) => rule.test(value)).length
  const strength = Math.min((completed / strengthRules.length) * 100, 100)

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-600">Password strength</span>
        <span className="font-semibold text-blue-900">{completed}/5 met</span>
      </div>
      <div className="h-2 rounded-full bg-white">
        <div
          className="h-2 rounded-full bg-blue-900 transition-all duration-300"
          style={{ width: `${strength}%` }}
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {strengthRules.map((rule) => {
          const matched = rule.test(value)

          return (
            <div key={rule.label} className="flex items-center gap-2 text-sm text-slate-600">
              <Check className={`h-4 w-4 ${matched ? 'text-green-600' : 'text-slate-300'}`} />
              {rule.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PasswordStrength
