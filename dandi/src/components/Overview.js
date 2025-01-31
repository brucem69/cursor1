'use client';

export function Overview({ usage = 24, limit = 1000 }) {
  const usagePercentage = (usage / limit) * 100;

  return (
    <div className="mb-8 rounded-lg p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white">
      <div className="mb-2 text-sm font-medium">CURRENT PLAN</div>
      <h1 className="text-3xl font-bold mb-4">Researcher</h1>
      <div className="mb-2">API Limit</div>
      <div className="flex items-center gap-2">
        <div className="w-full bg-white/30 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2" 
            style={{ width: `${usagePercentage}%` }}
          ></div>
        </div>
        <span className="text-sm">{usage} / {limit} Requests</span>
      </div>
    </div>
  );
} 