import { motion } from 'framer-motion'
import { FiArrowDown, FiArrowRight } from 'react-icons/fi'

import { workflowSteps } from '../data'
import { fadeUpVariants, SectionHeading, SectionShell, staggerVariants } from '../shared'

const Workflow = () => {
  return (
    <SectionShell id="workflow" className="bg-slate-50">
      <div className="space-y-14">
        <SectionHeading
          centered
          eyebrow="Workflow"
          title="A simple operational flow that keeps every asset and request moving."
          description="The experience is intentionally linear: organizations sign in, configure their structure, register resources, and keep the workflow moving through approvals, audits, and reporting."
        />

        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-4 lg:flex-row lg:items-stretch"
        >
          {workflowSteps.map((step, index) => (
            <div key={step.label} className="flex flex-col lg:flex-1 lg:flex-row lg:items-center">
              <motion.div
                variants={fadeUpVariants}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:flex-1"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-900 text-sm font-bold text-white shadow-sm">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <p className="mt-4 text-base font-semibold text-blue-900">{step.label}</p>
              </motion.div>

              {index < workflowSteps.length - 1 ? (
                <div className="flex items-center justify-center px-0 py-3 lg:px-3 lg:py-0">
                  <FiArrowRight className="hidden text-xl text-slate-400 lg:block" />
                  <FiArrowDown className="text-xl text-slate-400 lg:hidden" />
                </div>
              ) : null}
            </div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  )
}

export default Workflow