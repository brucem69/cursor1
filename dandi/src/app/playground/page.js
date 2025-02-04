'use client';

import { AppLayout } from '@/components/AppLayout';
import { PlaygroundContent } from '@/components/PlaygroundContent';

export default function PlaygroundPage() {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">API Playground</h1>
        <PlaygroundContent />
      </div>
    </AppLayout>
  );
} 