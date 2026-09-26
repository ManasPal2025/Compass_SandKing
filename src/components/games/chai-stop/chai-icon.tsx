"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

interface ChaiIconProps {
  name: string;
  className?: string;
}

export function ChaiIcon({ name, className = "w-6 h-6" }: ChaiIconProps) {
  // @ts-expect-error dynamic lucide indexing
  const IconComponent = LucideIcons[name] || LucideIcons.Coffee;
  return <IconComponent className={className} aria-hidden="true" />;
}
