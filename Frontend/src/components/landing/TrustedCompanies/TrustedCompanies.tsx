import { motion } from 'framer-motion'

import { trustedCompanies } from '../data'
import { SectionHeading, SectionShell } from '../shared'

const TrustedCompanies = () => {
  const marqueeItems = [...trustedCompanies, ...trustedCompanies]

  return (
    <SectionShell id="trusted-by" className="bg-slate-50 py-20 sm:py-24">
      <SectionHeading
        centered
        eyebrow="Trusted by modern organizations"
        title="Operational teams rely on AssetFlow to keep control without slowing execution."
        description="Built for enterprises that want the rigor of a managed system with the clarity of a modern SaaS interface."
      />

      <div className="landing-marquee mt-12 rounded-3xl border border-slate-200 bg-white py-5 shadow-sm">
        <div className="landing-marquee-track gap-4 px-4">
          {marqueeItems.map((company, index) => (
            <motion.div
              key={`${company.name}-${index}`}
              whileHover={{ y: -2 }}
              className="flex min-w-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-8 py-5 text-sm font-semibold text-slate-400 grayscale transition duration-300 hover:text-slate-600"
            >
              {company.name}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

export default TrustedCompanies