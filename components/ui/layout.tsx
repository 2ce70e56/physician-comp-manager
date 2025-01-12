import * as React from "react"

export function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="flex flex-col gap-4 md:gap-8 md:flex-row md:items-center md:justify-between pb-4 md:pb-8 border-b"
      {...props}
    >
      {children}
    </div>
  )
}

export function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className="text-2xl font-bold tracking-tight text-primary"
      {...props}
    />
  )
}

export function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className="text-sm text-muted-foreground"
      {...props}
    />
  )
}

export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="container mx-auto px-4 md:px-6"
      {...props}
    >
      {children}
    </div>
  )
}

export function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="py-6 md:py-10"
      {...props}
    />
  )
}