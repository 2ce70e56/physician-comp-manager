'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, Title, Button } from '@tremor/react';

// Validation schema
const providerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  type: z.enum(['PHYSICIAN', 'NP', 'PA'], {
    required_error: 'Provider type is required'
  }),
  specialty: z.string().min(1, 'Specialty is required'),
  npi: z.string()
    .length(10, 'NPI must be 10 digits')
    .regex(/^\d+$/, 'NPI must contain only numbers')
    .optional()
    .or(z.literal('')),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string()
    .regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),
  startDate: z.string().min(1, 'Start date is required'),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE')
});

type ProviderFormData = z.infer<typeof providerSchema>;

interface ProviderFormProps {
  initialData?: Partial<ProviderFormData>;
  onSubmit: (data: ProviderFormData) => Promise<void>;
  onCancel: () => void;
}

export default function ProviderForm({ initialData, onSubmit, onCancel }: ProviderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProviderFormData>({
    resolver: zodResolver(providerSchema),
    defaultValues: initialData || {
      status: 'ACTIVE'
    }
  });

  const specialties = [
    'Cardiology',
    'Dermatology',
    'Emergency Medicine',
    'Family Medicine',
    'Gastroenterology',
    'Internal Medicine',
    'Neurology',
    'Obstetrics and Gynecology',
    'Oncology',
    'Ophthalmology',
    'Orthopedic Surgery',
    'Pediatrics',
    'Psychiatry',
    'Radiology',
    'Surgery',
    'Urology'
  ];

  const onFormSubmit = async (data: ProviderFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      <div className="form-section">
        <h3 className="form-section-title">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              id="firstName"
              type="text"
              className="form-input"
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              id="lastName"
              type="text"
              className="form-input"
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="type" className="form-label">Provider Type</label>
            <select
              id="type"
              className="form-select"
              {...register('type')}
            >
              <option value="">Select Type</option>
              <option value="PHYSICIAN">Physician</option>
              <option value="NP">Nurse Practitioner</option>
              <option value="PA">Physician Assistant</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="specialty" className="form-label">Specialty</label>
            <select
              id="specialty"
              className="form-select"
              {...register('specialty')}
            >
              <option value="">Select Specialty</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
            {errors.specialty && (
              <p className="text-red-500 text-sm mt-1">{errors.specialty.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-input"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              id="phone"
              type="tel"
              className="form-input"
              placeholder="+1234567890"
              {...register('phone')}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Additional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="npi" className="form-label">NPI Number</label>
            <input
              id="npi"
              type="text"
              className="form-input"
              placeholder="10-digit NPI number"
              {...register('npi')}
            />
            {errors.npi && (
              <p className="text-red-500 text-sm mt-1">{errors.npi.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input
              id="startDate"
              type="date"
              className="form-input"
              {...register('startDate')}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {initialData ? 'Update Provider' : 'Add Provider'}
        </Button>
      </div>
    </form>
  );
}