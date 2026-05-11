type NavItemProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function NavItem({
  label,
  disabled = false,
  onClick,
}: NavItemProps) {
  return (
    <button
      className={`
    text-secondary-1
    p-2
    rounded-md
    transition-colors

    ${
      disabled
        ? "cursor-not-allowed opacity-50"
        : "cursor-pointer hover:bg-gray-100"
    }
  `}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
