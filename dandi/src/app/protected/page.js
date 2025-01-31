import { AppLayout } from '@/components/AppLayout';
import { ProtectedContent } from '@/components/ProtectedContent';

export default function ProtectedPage() {
  return (
    <AppLayout>
      <ProtectedContent />
    </AppLayout>
  );
} 