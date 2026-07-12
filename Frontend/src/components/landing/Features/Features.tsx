import { motion } from 'framer-motion'

import { featureItems } from '../data'
import { fadeUpVariants, SectionHeading, SectionShell, staggerVariants } from '../shared'

const Features = () => {
  return (
    <SectionShell id="features" className="bg-white">
      <div className="space-y-14">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to manage assets efficiently."
          description="AssetFlow combines the controls enterprises need with the speed and clarity teams expect from a premium SaaS platform."
        />

        <motion.div
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {featureItems.map((item) => {
            const Icon = item.icon

            return (
              <motion.article
                key={item.title}
                variants={fadeUpVariants}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-900 transition duration-300 group-hover:scale-105 group-hover:bg-blue-900 group-hover:text-white">
                  <Icon className="text-xl" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-blue-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </SectionShell>
  )
}

export default Features