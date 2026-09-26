"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

interface ItemIconProps {
  name: string;
  className?: string;
}

export function ItemIcon({ name, className = "w-5 h-5" }: ItemIconProps) {
  // @ts-expect-error dynamic lucide indexing
  const IconComponent = LucideIcons[name] || LucideIcons.Package;
  return <IconComponent className={className} aria-hidden="true" />;
}
