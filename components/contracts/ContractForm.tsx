'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, Title, Button } from '@tremor/react';
import { PlusIcon, TrashIcon } from 'lucide-react';

// Validation schema
const contractTermSchema = z.object({
  type: z.enum(['base', 'wRVU', 'quality', 'bonus'], {
    required_error: 'Term type is required'
  }),
  amount: z.number().min(0, 'Amount must be positive'),
  frequency: z.enum(['annual', 'monthly', 'quarterly']),
  threshold: z.number().min(0).optional(),
  metric: z.string().optional(),
  description: z.string().optional()
});

const contractSchema = z.object({
  providerId: z.string().min(1, 'Provider is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  terms: z.array(contractTermSchema).min(1, 'At least one term is required')
});

type ContractFormData = z.infer<typeof contractSchema>;

interface ContractFormProps {
  initialData?: Partial<ContractFormData>;
  providers: Array<{ id: string; name: string; specialty: string; }>;
  onSubmit: (data: ContractFormData) => Promise<void>;
  onCancel: () => void;
}

export default function ContractForm({ initialData, providers, onSubmit, onCancel }: ContractFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: initialData || {
      terms: [{ type: 'base', frequency: 'annual', amount: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'terms'
  });

  const onFormSubmit = async (data: ContractFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting contract:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      <div className="form-section">
        <h3 className="form-section-title">Contract Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="providerId" className="form-label">Provider</label>
            <select
              id="providerId"
              className="form-select"
              {...register('providerId')}
            >
              <option value="">Select Provider</option>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name} - {provider.specialty}
                </option>
              ))}
            </select>
            {errors.providerId && (
              <p className="text-red-500 text-sm mt-1">{errors.providerId.message}</p>
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

          <div>
            <label htmlFor="endDate" className="form-label">End Date (Optional)</label>
            <input
              id="endDate"
              type="date"
              className="form-input"
              {...register('endDate')}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="flex justify-between items-center mb-4">
          <h3 className="form-section-title mb-0">Compensation Terms</h3>
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ type: 'base', frequency: 'annual', amount: 0 })}
            icon={PlusIcon}
          >
            Add Term
          </Button>
        </div>

        {fields.map((field, index) => (
          <Card key={field.id} className="mb-4 p-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  {...register(`terms.${index}.type`)}
                >
                  <option value="base">Base Salary</option>
                  <option value="wRVU">wRVU Based</option>
                  <option value="quality">Quality Bonus</option>
                  <option value="bonus">Other Bonus</option>
                </select>
                {errors.terms?.[index]?.type && (
                  <p className="text-red-500 text-sm mt-1">{errors.terms[index].type?.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-input"
                  {...register(`terms.${index}.amount`, { valueAsNumber: true })}
                />
                {errors.terms?.[index]?.amount && (
                  <p className="text-red-500 text-sm mt-1">{errors.terms[index].amount?.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">Frequency</label>
                <select
                  className="form-select"
                  {...register(`terms.${index}.frequency`)}
                >
                  <option value="annual">Annual</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
                {errors.terms?.[index]?.frequency && (
                  <p className="text-red-500 text-sm mt-1">{errors.terms[index].frequency?.message}</p>
                )}
              </div>

              {watch(`terms.${index}.type`) === 'wRVU' && (
                <div className="md:col-span-2">
                  <label className="form-label">wRVU Threshold</label>
                  <input
                    type="number"
                    className="form-input"
                    {...register(`terms.${index}.threshold`, { valueAsNumber: true })}
                  />
                  {errors.terms?.[index]?.threshold && (
                    <p className="text-red-500 text-sm mt-1">{errors.terms[index].threshold?.message}</p>
                  )}
                </div>
              )}

              {watch(`terms.${index}.type`) === 'quality' && (
                <div className="md:col-span-2">
                  <label className="form-label">Quality Metric</label>
                  <input
                    type="text"
                    className="form-input"
                    {...register(`terms.${index}.metric`)}
                  />
                  {errors.terms?.[index]?.metric && (
                    <p className="text-red-500 text-sm mt-1">{errors.terms[index].metric?.message}</p>
                  )}
                </div>
              )}

              <div className="flex justify-end md:col-span-2 lg:col-span-3">
                <Button
                  type="button"
                  variant="secondary"
                  color="red"
                  icon={TrashIcon}
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {errors.terms && (
          <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
        )}
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
          {initialData ? 'Update Contract' : 'Create Contract'}
        </Button>
      </div>
    </form>
  );
}