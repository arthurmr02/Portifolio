import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeaturedPicker from '../components/dashboard/FeaturedPicker';
import MessageList from '../components/dashboard/MessageList';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import { useAuth } from '../hooks/useAuth';
import { usePageTitle } from '../hooks/usePageTitle';

const TABS = [
  { id: 'mensagens', label: 'Mensagens' },
  { id: 'destaques', label: 'Destaques' },
];

export default function DashboardPage() {
  usePageTitle('Painel');
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState(TABS[0].id);
  const [leaving, setLeaving] = useState(false);

  async function handleLogout() {
    setLeaving(true);
    try {
      await logout();
    } finally {
      navigate('/', { replace: true });
    }
  }

  return (
    <Container className="py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">Painel</h1>
          <p className="text-muted mt-1 text-sm">{session?.user?.email}</p>
        </div>
        <Button variant="secondary" size="sm" loading={leaving} onClick={handleLogout}>
          Sair
        </Button>
      </div>

      <div
        role="tablist"
        aria-label="Seções do painel"
        className="border-line mt-8 flex gap-2 border-b"
      >
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={tab === item.id}
            aria-controls={`painel-${item.id}`}
            onClick={() => setTab(item.id)}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === item.id
                ? 'border-accent text-ink'
                : 'text-muted hover:text-ink border-transparent'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`painel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        className="mt-6"
      >
        {tab === 'mensagens' ? <MessageList /> : <FeaturedPicker />}
      </div>
    </Container>
  );
}
