// src/types/react-paystack.d.ts
declare module "react-paystack" {
    interface PaystackButtonProps {
      publicKey: string;
      email: string;
      amount: number; // In kobo
      metadata?: {
        name?: string;
        phone?: string;
      };
      text?: string;
      onSuccess: () => void;
      onClose: () => void;
      className?: string;
    }
  
    export const PaystackButton: React.FC<PaystackButtonProps>;
  }
  