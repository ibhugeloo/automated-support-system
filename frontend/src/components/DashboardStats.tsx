import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Record {
  createdTime: string;
  fields: {
    client_name: string;
    message: string;
    channel: string;
    category: string;
  };
}

interface Props {
  records: Record[];
}

const DashboardStats: React.FC<Props> = ({ records }) => {
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    avgResponseTime: '0',
    satisfaction: 0
  });

  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.setDate(now.getDate() - 7));
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const todayCount = records.filter(r => new Date(r.createdTime) >= today).length;
    const weekCount = records.filter(r => new Date(r.createdTime) >= thisWeek).length;
    const monthCount = records.filter(r => new Date(r.createdTime) >= thisMonth).length;

    setStats({
      total: records.length,
      today: todayCount,
      thisWeek: weekCount,
      thisMonth: monthCount,
      avgResponseTime: '5min',
      satisfaction: 95
    });
  }, [records]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900">Total demandes</h3>
        <p className="mt-2 text-3xl font-semibold text-blue-700">{stats.total}</p>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-green-900">Aujourd'hui</h3>
        <p className="mt-2 text-3xl font-semibold text-green-700">{stats.today}</p>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-purple-900">Cette semaine</h3>
        <p className="mt-2 text-3xl font-semibold text-purple-700">{stats.thisWeek}</p>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-yellow-900">Ce mois</h3>
        <p className="mt-2 text-3xl font-semibold text-yellow-700">{stats.thisMonth}</p>
      </div>
      
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-indigo-900">Temps de réponse moyen</h3>
        <p className="mt-2 text-3xl font-semibold text-indigo-700">{stats.avgResponseTime}</p>
      </div>
      
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-red-900">Satisfaction client</h3>
        <p className="mt-2 text-3xl font-semibold text-red-700">{stats.satisfaction}%</p>
      </div>
    </div>
  );
};

export default DashboardStats;