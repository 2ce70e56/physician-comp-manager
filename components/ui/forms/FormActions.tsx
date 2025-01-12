'use client';

import { ReactNode } from 'react';

interface FormActionsProps {
  children: ReactNode;
  className?: string;
}

export default function FormActions({
  children,
  className = ''
}: FormActionsProps) {
  return (
    <div className={`flex justify-end space-x-4 ${className}`}>
      {children}
    </div>
  );
}