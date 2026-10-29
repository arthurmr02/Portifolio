import { useContactForm } from '../../hooks/useContactForm';
import { getFriendlyMessage } from '../../lib/errors';
import { MESSAGE_MAX_LENGTH, MESSAGE_MIN_LENGTH } from '../../schemas/contactSchema';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Field from '../ui/Field';

export default function ContactForm() {
  const {
    register,
    errors,
    messageLength,
    submit,
    isSending,
    isSuccess,
    error,
    dismiss,
  } = useContactForm();

  if (isSuccess) {
    return (
      <Card role="status" className="flex flex-col items-start gap-3">
        <h2 className="font-display text-2xl">Mensagem enviada!</h2>
        <p className="text-muted">
          Obrigado pelo contato. Eu respondo no e-mail que você informou.
        </p>
        <Button variant="secondary" onClick={dismiss}>
          Enviar outra mensagem
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <form
        onSubmit={submit}
        noValidate
        className="space-y-5"
        aria-label="Formulário de contato"
      >
        <Field
          label="Nome"
          autoComplete="name"
          error={errors.name?.message}
          disabled={isSending}
          {...register('name')}
        />
        <Field
          label="E-mail"
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.email?.message}
          disabled={isSending}
          {...register('email')}
        />
        <Field
          label="Mensagem"
          multiline
          rows={6}
          error={errors.message?.message}
          hint={`${messageLength}/${MESSAGE_MAX_LENGTH} caracteres (mínimo ${MESSAGE_MIN_LENGTH})`}
          disabled={isSending}
          {...register('message')}
        />

        {/* Campo isca: invisível para pessoas, robôs costumam preenchê-lo. */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        >
          <label>
            Não preencha este campo
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register('website')}
            />
          </label>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-500/40 px-4 py-3 text-sm text-red-500"
          >
            Não foi possível enviar sua mensagem. {getFriendlyMessage(error)}
          </p>
        )}

        <Button type="submit" size="lg" loading={isSending} className="w-full sm:w-auto">
          {isSending ? 'Enviando...' : 'Enviar mensagem'}
        </Button>
      </form>
    </Card>
  );
}
