import * as Icons from "lucide-react";
import { BookOpen, LucideIcon } from "lucide-react";

export function getIcon(iconName: string): LucideIcon {
  const icon = Icons[iconName as keyof typeof Icons];
  return (icon as LucideIcon) ?? BookOpen;
}
