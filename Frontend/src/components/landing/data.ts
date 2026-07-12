import {
  FiActivity,
  FiArchive,
  FiBarChart2,
  FiBell,
  FiCalendar,
  FiClipboard,
  FiCpu,
  FiLock,
  FiShield,
  FiTool,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi'

import type {
  BenefitItem,
  CompanyItem,
  FeatureItem,
  FooterLinkGroup,
  NavigationItem,
  StatisticItem,
  TestimonialItem,
  WorkflowStepItem,
} from './types'

export const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Modules', href: '#modules' },
  { label: 'Pricing', href: '#statistics' },
  { label: 'Documentation', href: '#workflow' },
  { label: 'About', href: '#why-choose-us' },
  { label: 'Contact', href: '#contact' },
]

export const trustedCompanies: CompanyItem[] = [
  { name: 'Northstar Logistics' },
  { name: 'Atlas Manufacturing' },
  { name: 'Crescent Health' },
  { name: 'Summit Retail' },
  { name: 'Apex Energy' },
  { name: 'Nexus Services' },
]

export const featureItems: FeatureItem[] = [
  {
    title: 'Asset Management',
    description:
      'Register, classify, and maintain a single source of truth for every physical asset across your organization.',
    icon: FiArchive,
  },
  {
    title: 'Employee Management',
    description:
      'Keep ownership, assignment, and accountability aligned to departments and active users in real time.',
    icon: FiUsers,
  },
  {
    title: 'Booking',
    description:
      'Reserve rooms, vehicles, and shared equipment with approval-aware booking flows and visibility controls.',
    icon: FiCalendar,
  },
  {
    title: 'Maintenance',
    description:
      'Capture requests, route approvals, and track corrective or preventive work from issue to resolution.',
    icon: FiTool,
  },
  {
    title: 'Audit',
    description:
      'Run asset audits with traceable checkpoints, verification logs, and discrepancy tracking.',
    icon: FiClipboard,
  },
  {
    title: 'Reports',
    description:
      'See utilization, ownership, lifecycle, and operational trends through structured reporting.',
    icon: FiBarChart2,
  },
  {
    title: 'Notifications',
    description:
      'Keep users informed with approval, booking, maintenance, and policy notifications that stay actionable.',
    icon: FiBell,
  },
  {
    title: 'Analytics',
    description:
      'Monitor performance with dashboards that surface asset health, workflow throughput, and utilization patterns.',
    icon: FiTrendingUp,
  },
]

export const statisticItems: StatisticItem[] = [
  { label: 'Assets', target: 10, suffix: 'K+' },
  { label: 'Companies', target: 500, suffix: '+' },
  { label: 'Customer Satisfaction', target: 95, suffix: '%', decimals: 0 },
  { label: 'System Uptime', target: 99.9, suffix: '%', decimals: 1 },
]

export const benefitItems: BenefitItem[] = [
  {
    title: 'Role Based Access',
    description:
      'Apply permissions by department, job function, or responsibility so the right people see the right tools.',
    icon: FiShield,
    metric: 'Precision access control',
  },
  {
    title: 'Real Time Tracking',
    description:
      'See allocations, status changes, and lifecycle events as they happen across the organization.',
    icon: FiActivity,
    metric: 'Live operational visibility',
  },
  {
    title: 'Automation',
    description:
      'Reduce manual coordination with approval routes, automated reminders, and workflow-driven actions.',
    icon: FiCpu,
    metric: 'Repeatable process automation',
  },
  {
    title: 'Security',
    description:
      'Protect enterprise data with auditable activity trails, controlled access, and policy-first controls.',
    icon: FiLock,
    metric: 'Enterprise-grade governance',
  },
]

export const workflowSteps: WorkflowStepItem[] = [
  { label: 'Signup' },
  { label: 'Organization Setup' },
  { label: 'Register Assets' },
  { label: 'Allocate Assets' },
  { label: 'Book Resources' },
  { label: 'Maintenance' },
  { label: 'Audit' },
  { label: 'Reports' },
]

export const testimonialItems: TestimonialItem[] = [
  {
    name: 'Aditi Verma',
    designation: 'Head of Operations',
    company: 'Northstar Logistics',
    review:
      'AssetFlow gave our teams a clear operating model for assets, bookings, and approvals without sacrificing speed or control.',
    initials: 'AV',
  },
  {
    name: 'Daniel Chen',
    designation: 'IT Director',
    company: 'Atlas Manufacturing',
    review:
      'The interface feels premium and organized. It replaced a patchwork of spreadsheets with a system the whole company can trust.',
    initials: 'DC',
  },
  {
    name: 'Maya Thompson',
    designation: 'Facilities Manager',
    company: 'Summit Retail',
    review:
      'We now track maintenance, allocations, and meeting room usage in one workflow, which has removed a lot of operational friction.',
    initials: 'MT',
  },
]

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: 'Product',
    links: ['Asset Management', 'Booking', 'Maintenance', 'Audit'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Contact', 'Security'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Support', 'Changelog', 'Status'],
  },
]

