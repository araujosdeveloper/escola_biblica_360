
import React, { useEffect, useState } from 'react';
import pb from '@/lib/pocketbaseProductionClient.js';
import { FileText, Tags, Download, Users, Mail, LogOut, User, LayoutDashboard, Activity } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '../context/AdminAuthContext.jsx';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { loggerService } from '@/services/loggerService.js';

const StatCard = ({ title, value, icon: Icon, colorClass, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-admin-border shadow-sm flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-admin-dark">{value}</h3>
      {trend > 0 && (
        <p className={`text-xs font-medium mt-2 text-green-600`}>
          ↑ {trend} este mês
        </p>
      )}
    </div>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState({ posts: 0, categories: 0, downloads: 0, subscribers: 0, messages: 0 });
  const [recentPosts, setRecentPosts] = useState([]);
  const [catMap, setCatMap] = useState({});
  const [growthData, setGrowthData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { currentAdmin, logout, role } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [postsReq, catsReq, dlsReq, subsReq, msgsReq, recentReq, allPostsReq, allDlsReq] = await Promise.all([
          pb.collection('posts').getList(1, 1, { $autoCancel: false }),
          pb.collection('categories').getFullList({ $autoCancel: false }),
          pb.collection('downloads').getList(1, 1, { $autoCancel: false }),
          pb.collection('newsletter_subscribers').getList(1, 1, { $autoCancel: false }),
          pb.collection('contact_messages').getList(1, 1, { filter: 'status="new"', $autoCancel: false }),
          pb.collection('posts').getList(1, 5, { sort: '-created', $autoCancel: false }),
          pb.collection('posts').getFullList({ fields: 'created,category_id', $autoCancel: false }),
          pb.collection('downloads').getFullList({ fields: 'created', $autoCancel: false })
        ]);

        const map = Object.fromEntries(catsReq.map(c => [c.id, c.name]));
        setCatMap(map);

        setStats({
          posts: postsReq.totalItems,
          categories: catsReq.length,
          downloads: dlsReq.totalItems,
          subscribers: subsReq.totalItems,
          messages: msgsReq.totalItems
        });
        setRecentPosts(recentReq.items);

        const last5Months = Array.from({length: 5}).map((_, i) => {
          const d = new Date();
          d.setMonth(d.getMonth() - (4 - i));
          return {
            month: d.getMonth(),
            year: d.getFullYear(),
            name: d.toLocaleString('pt-BR', { month: 'short' }).replace('.', ''),
            artigos: 0,
            downloads: 0
          };
        });

        let currentMonthPosts = 0;
        let currentMonthDownloads = 0;
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        allPostsReq.forEach(p => {
          const d = new Date(p.created);
          if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) currentMonthPosts++;
          const m = last5Months.find(x => x.month === d.getMonth() && x.year === d.getFullYear());
          if (m) m.artigos++;
        });
        
        allDlsReq.forEach(d => {
          const date = new Date(d.created);
          if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) currentMonthDownloads++;
          const m = last5Months.find(x => x.month === date.getMonth() && x.year === date.getFullYear());
          if (m) m.downloads++;
        });
        setGrowthData(last5Months);

        setStats(prev => ({
          ...prev,
          recentPostsCount: currentMonthPosts,
          recentDownloadsCount: currentMonthDownloads
        }));

        const catCounts = {};
        allPostsReq.forEach(p => {
          if (p.category_id) {
            catCounts[p.category_id] = (catCounts[p.category_id] || 0) + 1;
          }
        });
        
        const catDataArray = Object.entries(catCounts).map(([id, count]) => ({
          name: map[id] || 'Outros',
          value: count
        })).filter(x => x.value > 0);
        
        if (catDataArray.length === 0) {
          catDataArray.push({ name: 'Sem dados', value: 1 });
        }
        setCategoryData(catDataArray);

      } catch (err) {
        loggerService.error("Erro ao carregar dados do dashboard", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const COLORS = ['#1a3a52', '#d4af37', '#e11d48', '#10b981', '#f59e0b', '#3b82f6'];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-admin-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-admin-background rounded-xl flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-admin-dark" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-admin-dark font-['Poppins']">Painel de Controle</h1>
            <p className="text-sm text-gray-500">Bem-vindo(a) de volta, {currentAdmin?.name || 'Administrador'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl border border-admin-border">
            <User className="w-4 h-4 text-gray-500" />
            <div className="hidden sm:block">
              <span className="text-xs font-bold uppercase tracking-wider text-admin-gold">{role}</span>
            </div>
          </div>
          <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={handleLogout}>
            <LogOut className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatCard title="Total de Artigos" value={stats.posts} icon={FileText} colorClass="bg-admin-dark" trend={stats.recentPostsCount} />
        <StatCard title="Categorias" value={stats.categories} icon={Tags} colorClass="bg-admin-gold" />
        <StatCard title="Downloads" value={stats.downloads} icon={Download} colorClass="bg-emerald-500" trend={stats.recentDownloadsCount} />
        <StatCard title="Assinantes" value={stats.subscribers} icon={Users} colorClass="bg-amber-500" />
        <StatCard title="Mensagens Novas" value={stats.messages} icon={Mail} colorClass="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-admin-border shadow-sm">
          <h2 className="text-lg font-bold text-admin-dark font-['Poppins'] mb-6 flex items-center"><Activity className="w-5 h-5 mr-2 text-admin-gold" /> Desempenho e Crescimento</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="artigos" name="Artigos" fill="#1a3a52" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="downloads" name="Downloads" fill="#d4af37" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-admin-border shadow-sm">
          <h2 className="text-lg font-bold text-admin-dark font-['Poppins'] mb-6">Distribuição de Conteúdo</h2>
          <div className="h-[240px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.slice(0, 6).map((item, index) => (
              <div key={item.name} className="flex items-center text-xs text-gray-600 truncate">
                <span className="w-3 h-3 rounded-full mr-2 flex-shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                <span className="truncate" title={item.name}>{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-admin-border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-admin-dark font-['Poppins']">Publicações Recentes</h2>
          <Button variant="ghost" asChild className="text-admin-gold hover:text-admin-gold/80">
            <Link to="/admin/posts">Ver todos</Link>
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Título</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 rounded-r-lg">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="4" className="text-center py-8 text-gray-500">Carregando...</td></tr>
              ) : recentPosts.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-8 text-gray-500">Nenhum post recente.</td></tr>
              ) : (
                recentPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-4 font-medium text-admin-dark">{post.title}</td>
                    <td className="px-4 py-4 text-gray-500">{catMap[post.category_id] || 'Sem categoria'}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-500">{new Date(post.created).toLocaleDateString('pt-BR')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
