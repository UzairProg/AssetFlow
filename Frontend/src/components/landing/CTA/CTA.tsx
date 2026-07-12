import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

import { fadeUpVariants, SectionShell } from '../shared'

const CTA = () => {
  return (
    <SectionShell id="contact" className="bg-slate-50">
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="rounded-[2rem] border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10 lg:px-16 lg:py-16"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Final CTA</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl lg:text-5xl">
          Ready to modernize your organization?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          Bring assets, bookings, maintenance, audits, and reporting into a single
          enterprise platform designed to keep teams aligned and executives informed.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#home"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-900 px-8 py-4 text-sm font-semibold !text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-blue-800 hover:shadow-xl"
          >
            Get Started
            <FiArrowRight />
          </a>
          <a
            href="#workflow"
            className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-8 py-4 text-sm font-semibold text-blue-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
          >
            Schedule Demo
          </a>
        </div>
      </motion.div>
    </SectionShell>
  )
}

export default CTA