import type { FC } from 'react'
import { useState } from 'react'

const AuditWizard: FC = () => {
  const [step, setStep] = useState(1)

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6">
        {step === 1 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-[#0F172A]">Audit Details</h4>
            <input placeholder="Audit name" className="w-full rounded-2xl border border-[#E5E7EB] px-3 py-2" />
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              <select className="rounded-2xl border border-[#E5E7EB] px-3 py-2">
                <option>Department</option>
              </select>
              <select className="rounded-2xl border border-[#E5E7EB] px-3 py-2">
                <option>Location</option>
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-[#0F172A]">Assign Auditors</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2"><input type="checkbox" /> Emma Clarke</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Liam Johnson</label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-[#0F172A]">Review</h4>
            <div className="text-sm text-[#64748B]">Review your audit cycle before creating.</div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          {step > 1 && <button onClick={() => setStep((s) => s - 1)} className="rounded-2xl border border-[#E5E7EB] px-3 py-2">Back</button>}
        </div>
        <div>
          {step < 3 ? (
            <button onClick={() => setStep((s) => s + 1)} className="rounded-2xl bg-[#1E3A8A] px-4 py-2 text-sm font-semibold text-white">Next</button>
          ) : (
            <button className="rounded-2xl bg-[#16A34A] px-4 py-2 text-sm font-semibold text-white">Create Audit</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuditWizard
