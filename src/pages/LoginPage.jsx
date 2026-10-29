import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import Field from '../components/ui/Field';
import PageSpinner from '../components/ui/PageSpinner';
import { useAuth } from '../hooks/useAuth';
import { usePageTitle } from '../hooks/usePageTitle';
import { getFriendlyMessage } from '../lib/errors';
import { loginSchema } from '../schemas/loginSchema';

function loginErrorMessage(error) {
  // O Supabase responde 400 "Invalid login credentials" para e-mail ou senha errados.
  if (error?.status === 400) return 'E-mail ou senha incorretos.';
  return getFriendlyMessage(error);
}

export default function LoginPage() {
  usePageTitle('Entrar');
  const { status, isConfigured, login } = useAuth();
  const location = useLocation();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  });
  const mutation = useMutation({ mutationFn: login });

  if (status === 'loading') return <PageSpinner label="Verificando sessão" />;
  if (status === 'authenticated') {
    return <Navigate to={location.state?.from ?? '/painel'} replace />;
  }

  const { errors } = form.formState;

  return (
    <Container className="flex justify-center py-16">
      <Card className="w-full max-w-md">
        <h1 className="font-display text-3xl">Área do dono</h1>
        <p className="text-muted mt-2 text-sm">
          Entre para ver mensagens e escolher os destaques.
        </p>

        {!isConfigured && (
          <p
            role="alert"
            className="border-line text-muted mt-4 rounded-xl border px-4 py-3 text-sm"
          >
            O Supabase ainda não foi configurado. Preencha as variáveis no arquivo .env.
          </p>
        )}

        <form
          onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
          noValidate
          className="mt-6 space-y-5"
          aria-label="Entrar"
        >
          <Field
            label="E-mail"
            type="email"
            autoComplete="username"
            error={errors.email?.message}
            disabled={mutation.isPending}
            {...form.register('email')}
          />
          <Field
            label="Senha"
            type="password"
            autoComplete="current-password"
            error={errors.password?.message}
            disabled={mutation.isPending}
            {...form.register('password')}
          />
          {mutation.error && (
            <p role="alert" className="text-sm text-red-500">
              {loginErrorMessage(mutation.error)}
            </p>
          )}
          <Button type="submit" size="lg" loading={mutation.isPending} className="w-full">
            {mutation.isPending ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Card>
    </Container>
  );
}
