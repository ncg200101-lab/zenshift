declare module 'convertkit-react' {
  import { ComponentType } from 'react';

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

  const ConvertKitForm: ComponentType<ConvertKitFormProps>;
  export default ConvertKitForm;
}
