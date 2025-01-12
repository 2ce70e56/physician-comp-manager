'use client';

import { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function FormSection({
  title,
  description,
  children,
  className = ''
}: FormSectionProps) {
  return (
    <div className={`form-section ${className}`}>
      <h3 className="form-section-title">{title}</h3>
      {description && (
        <p className="text-gray-500 text-sm mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}