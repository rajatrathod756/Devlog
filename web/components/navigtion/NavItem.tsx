import { ReactNode } from 'react'

type NavItemProps = {
  label: string
  disabled?: boolean
  onClick?: () => void
  icon?: ReactNode
}

export default function NavItem({
  label,
  disabled = false,
  onClick,
  icon,
}: NavItemProps) {

  return (
    <button
      className={`
        flex
        items-center
        gap-3
        text-secondary-1
        p-2
        rounded-md
        transition-colors

        ${disabled
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer hover:bg-primary-2'
        }
      `}
      disabled={disabled}
      onClick={onClick}
    >

      {icon}

      <span>{label}</span>

    </button>
  )
}