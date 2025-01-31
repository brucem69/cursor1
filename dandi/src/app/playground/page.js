import { AppLayout } from '@/components/AppLayout';
import { PlaygroundContent } from '@/components/PlaygroundContent';
import { Overview } from '@/components/ApiKeys/Overview';

export default function PlaygroundPage() {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <Overview usage={24} limit={1000} />
        <PlaygroundContent />
      </div>
    </AppLayout>
  );
} 