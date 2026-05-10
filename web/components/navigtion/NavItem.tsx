type NavItemProps = {
  label: string
  disabled?: boolean
}

export default function NavItem({
  label,
  disabled = false,
}: NavItemProps) {
  return (
    <button className=" text-secondary-1 p-2 rounded-md" disabled={disabled}>
      {label}
    </button>
  )
}