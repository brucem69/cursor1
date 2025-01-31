'use client';

import { AppLayout } from '@/components/AppLayout';
import { Dashboard } from '@/components/ApiKeys/Dashboard';

export default function ApiKeysPage() {
  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  );
}