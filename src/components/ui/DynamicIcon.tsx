import { getIcon } from "@/lib/icons";

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function DynamicIcon({
  name,
  size = 22,
  className,
}: DynamicIconProps) {
  const Icon = getIcon(name);
  return <Icon size={size} className={className} aria-hidden />;
}
