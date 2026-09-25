import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide" | "full";
}

const sizeClasses = {
  narrow: "max-w-4xl",
  default: "max-w-7xl",
  wide: "max-w-[1440px]",
  full: "w-full",
};

export function Container({
  children,
  className = "",
  size = "default",
}: ContainerProps) {
  return (
    <div className={`mx-auto px-5 sm:px-6 md:px-12 w-full ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  spacing?: "sm" | "default" | "lg" | "none";
}

const spacingClasses = {
  none: "py-0",
  sm: "py-10 sm:py-12 md:py-16",
  default: "py-14 sm:py-20 md:py-32",
  lg: "py-16 sm:py-24 md:py-44",
};

export function Section({
  children,
  id,
  className = "",
  spacing = "default",
}: SectionProps) {
  return (
    <section id={id} className={`w-full relative ${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  );
}
