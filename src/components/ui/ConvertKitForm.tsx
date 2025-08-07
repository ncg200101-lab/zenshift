import React, { useState, FormEvent } from 'react';
import { FullWidthButton } from './Buttons';

interface ConvertKitFormProps {
  formId: string;
  template?: string;
  hideName?: boolean;
  hideEmail?: boolean;
  submitText?: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
  style?: React.CSSProperties;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

interface FormData {
  name?: string;
  email: string;
}

interface ConvertKitResponse {
  subscription?: {
    id: number;
    state: string;
    created_at: string;
    source: string;
    referrer: string | null;
    subscribable_id: number;
    subscribable_type: string;
    subscriber: {
      id: number;
      first_name: string;
      email_address: string;
      state: string;
      created_at: string;
      fields: Record<string, any>;
    };
  };
  error?: string;
}

const ConvertKitForm: React.FC<ConvertKitFormProps> = ({
  formId,
  template = 'mills',
  hideName = false,
  hideEmail = false,
  submitText = 'Subscribe',
  successMessage = 'Thanks for subscribing!',
  errorMessage = 'Something went wrong. Please try again.',
  className = '',
  style,
  onSuccess,
  onError,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare the data for ConvertKit API
      const submitData: any = {
        api_key: 'ZpmghPb3IqER-GVSc1KWyw',
        email: formData.email,
        form: formId,
        tags: [],
      };

      // Add name if provided and not hidden
      if (!hideName && formData.name) {
        submitData.first_name = formData.name;
      }

      // Submit to ConvertKit API
      const response = await fetch('https://api.convertkit.com/v3/forms/' + formId + '/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result: ConvertKitResponse = await response.json();

      if (response.ok && result.subscription) {
        setIsSuccess(true);
        onSuccess?.(result);
        // Reset form
        setFormData({ name: '', email: '' });
      } else {
        throw new Error(result.error || 'Subscription failed');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : errorMessage;
      setError(errorMsg);
      onError?.(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        className={`convertkit-success ${className}`}
        style={{
          ...style,
          background: 'linear-gradient(135deg, rgba(140, 106, 45, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: '32px 24px',
          textAlign: 'center',
          border: '1px solid rgba(140, 106, 45, 0.2)',
          boxShadow: '0 8px 32px rgba(140, 106, 45, 0.15), 0 0 0 1px rgba(255, 215, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glowing effect overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(140, 106, 45, 0.05) 100%)',
            borderRadius: '24px',
            pointerEvents: 'none',
          }}
        />

        {/* Header */}
        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            fontWeight: 'bold',
            fontSize: '22px',
            color: '#8C6A2D',
            margin: '0 0 16px 0',
            lineHeight: '1.4',
            position: 'relative',
            zIndex: 1,
          }}
        >
          You're In.
        </h3>

        {/* Body Text */}
        <div
          style={{
            fontFamily: 'Cormorant Garamond, Inter, sans-serif',
            fontSize: '18px',
            color: '#656565',
            lineHeight: '1.6',
            margin: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <p style={{ margin: '0 0 12px 0' }}>
            Your frequency is now synced.
          </p>
          <p style={{ margin: '0 0 12px 0' }}>
            Watch for light-encoded drops, sacred tools, and timeline-shifting updates.
          </p>
          <p style={{ margin: 0, fontStyle: 'italic' }}>
            This is not a newsletter. It's an invitation to remember.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      className={`convertkit-form ${className}`}
      style={style}
      onSubmit={handleSubmit}
    >
      {error && (
        <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      {!hideName && (
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            name="name"
            placeholder="First Name"
            value={formData.name || ''}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              outline: 'none',
            }}
            required
          />
        </div>
      )}

      {!hideEmail && (
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              outline: 'none',
            }}
            required
          />
        </div>
      )}

      <FullWidthButton
        type="submit"
        disabled={isSubmitting}
      // style={{
      //   width: '100%',
      //   padding: '0.75rem',
      //   // backgroundColor: isSubmitting ? '#9ca3af' : '#3b82f6',
      //   color: 'white',
      //   border: 'none',
      //   borderRadius: '0.375rem',
      //   fontSize: '1rem',
      //   fontWeight: '500',
      //   cursor: isSubmitting ? 'not-allowed' : 'pointer',
      //   transition: 'background-color 0.2s',
      // }}
      >
        {isSubmitting ? 'Subscribing...' : submitText}
      </FullWidthButton>
    </form>
  );
};

export default ConvertKitForm;
