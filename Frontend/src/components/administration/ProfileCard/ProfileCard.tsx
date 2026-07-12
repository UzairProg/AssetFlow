import type { FC } from 'react'

const ProfileCard: FC = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-[#E5E7EB]" />
        <div>
          <div className="text-lg font-semibold text-[#0F172A]">Admin User</div>
          <div className="text-sm text-[#64748B]">admin@example.com</div>
        </div>
      </div>
      <div className="mt-4">
        <button className="rounded-2xl border border-[#E5E7EB] px-3 py-2 text-sm">Edit Profile</button>
      </div>
    </div>
  )
}

export default ProfileCard
