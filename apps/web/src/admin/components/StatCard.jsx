
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function StatCard({ title, value, icon: Icon, colorClass }) {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-admin-border overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          </div>
          <div className={`p-4 rounded-xl ${colorClass}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
