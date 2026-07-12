import type { IconType } from 'react-icons'

export type NavigationItem = {
  label: string
  href: string
}

export type FeatureItem = {
  title: string
  description: string
  icon: IconType
}

export type CompanyItem = {
  name: string
}

export type StatisticItem = {
  label: string
  target: number
  suffix?: string
  prefix?: string
  decimals?: number
}

export type BenefitItem = {
  title: string
  description: string
  icon: IconType
  metric: string
}

export type WorkflowStepItem = {
  label: string
}

export type TestimonialItem = {
  name: string
  designation: string
  company: string
  review: string
  initials: string
}

export type FooterLinkGroup = {
  title: string
  links: string[]
}