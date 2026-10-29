import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { contactSchema } from '../schemas/contactSchema';
import { sendContactMessage } from '../services/contact';

/** Lógica do formulário de contato: validação por campo, envio e estados de feedback. */
export function useContactForm() {
  const form = useForm({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', message: '', website: '' },
  });

  // useWatch (em vez de form.watch) é compatível com o React Compiler e re-renderiza só aqui.
  const message = useWatch({ control: form.control, name: 'message' });

  const mutation = useMutation({
    mutationFn: async ({ website, ...values }) => {
      // O campo "website" é invisível: se veio preenchido, é robô. Finge sucesso e descarta.
      if (website) return { emailSent: true };
      return sendContactMessage(values);
    },
    onSuccess: () => form.reset(),
  });

  const submit = form.handleSubmit((values) => mutation.mutate(values));

  return {
    register: form.register,
    errors: form.formState.errors,
    messageLength: message?.length ?? 0,
    submit,
    isSending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    emailSent: mutation.data?.emailSent,
    error: mutation.error,
    dismiss: mutation.reset,
  };
}
