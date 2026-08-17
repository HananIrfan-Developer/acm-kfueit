import { useState, useEffect, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { LogOut, Plus, Trash2, Edit, Check, X, ShieldCheck, ExternalLink, Code } from 'lucide-react';
import toast from 'react-hot-toast';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'events' | 'members' | 'news' | 'highlights' | 'roles'>('events');
  const [events, setEvents] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [highlights, setHighlights] = useState<any[]>([]);
  const [userRoles, setUserRoles] = useState<any[]>([]);
  const [roleTableError, setRoleTableError] = useState(false);
  const [highlightsTableError, setHighlightsTableError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userPerms, setUserPerms] = useState<any>({ isSuper: false, news: false, events: false, members: false });

  // Forms
  const [eventForm, setEventForm] = useState({ title: '', description: '', date: '', imageUrl: '', status: 'upcoming' });
  const [memberForm, setMemberForm] = useState({ name: '', role: '', team: 'Core', registrationNumber: '', imageUrl: '', sortOrder: 999 });
  const [newsForm, setNewsForm] = useState({ title: '', content: '', date: '', imageUrl: '', author: '' });
  const [highlightForm, setHighlightForm] = useState({ imageUrl: '' });
  const [roleForm, setRoleForm] = useState({ email: '', role_news: false, role_events: false, role_members: false });

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      
      const email = session.user.email;
      setCurrentUser(session.user);
      
      let isSuper = email === 'hananirfan91@gmail.com' || email === 'acmkfueitt@gmail.com';
      let perms = { isSuper, news: isSuper, events: isSuper, members: isSuper };

      if (!isSuper) {
        const { data } = await supabase.from('user_roles').select('*').eq('email', email).single();
        if (data) {
          perms = { isSuper: false, news: data.role_news, events: data.role_events, members: data.role_members };
        }
        // Force tab to first available
        if (perms.events) setActiveTab('events');
        else if (perms.news) setActiveTab('news');
        else if (perms.members) setActiveTab('members');
      }

      setUserPerms(perms);

      const [eventsRes, membersRes, newsRes] = await Promise.all([
        perms.events || isSuper ? supabase.from('events').select('*').order('date', { ascending: false }) : Promise.resolve({data: []}),
        perms.members || isSuper ? supabase.from('members').select('*').order('sort_order', { ascending: true }) : Promise.resolve({data: []}),
        perms.news || isSuper ? supabase.from('news').select('*').order('date', { ascending: false }) : Promise.resolve({data: []})
      ]);

      if (eventsRes.data) setEvents(eventsRes.data);
      if (membersRes.data) setMembers(membersRes.data);
      if (newsRes.data) setNews(newsRes.data);

      if (isSuper) {
        const highlightsRes = await supabase.from('highlights').select('*').order('created_at', { ascending: false });
        if (highlightsRes.error) {
          setHighlightsTableError(true);
        } else if (highlightsRes.data) {
          setHighlights(highlightsRes.data);
        }

        const rolesRes = await supabase.from('user_roles').select('*').order('created_at', { ascending: false });
        if (rolesRes.error) {
          setRoleTableError(true);
        } else if (rolesRes.data) {
          setUserRoles(rolesRes.data);
        }
      }

    } catch (error) {
      console.error(error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleEventSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const data = { title: eventForm.title, description: eventForm.description, date: eventForm.date, image_url: eventForm.imageUrl, status: eventForm.status };
      if (editingId) {
        await supabase.from('events').update(data).eq('id', editingId);
        toast.success('Event updated');
      } else {
        await supabase.from('events').insert([data]);
        toast.success('Event created');
      }
      setEventForm({ title: '', description: '', date: '', imageUrl: '', status: 'upcoming' });
      setEditingId(null);
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleNewsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const data = { title: newsForm.title, content: newsForm.content, date: newsForm.date, image_url: newsForm.imageUrl, author: newsForm.author };
      if (editingId) {
        await supabase.from('news').update(data).eq('id', editingId);
        toast.success('News updated');
      } else {
        await supabase.from('news').insert([data]);
        toast.success('News created');
      }
      setNewsForm({ title: '', content: '', date: '', imageUrl: '', author: '' });
      setEditingId(null);
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleMemberSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const data = { name: memberForm.name, role: memberForm.role, team: memberForm.team, registration_number: memberForm.registrationNumber, image_url: memberForm.imageUrl, sort_order: memberForm.sortOrder };
      if (editingId) {
        await supabase.from('members').update(data).eq('id', editingId);
        toast.success('Member updated');
      } else {
        await supabase.from('members').insert([data]);
        toast.success('Member created');
      }
      setMemberForm({ name: '', role: '', team: 'Core', registrationNumber: '', imageUrl: '', sortOrder: 999 });
      setEditingId(null);
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleHighlightSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const data = { image_url: highlightForm.imageUrl };
      if (editingId) {
        await supabase.from('highlights').update(data).eq('id', editingId);
        toast.success('Highlight updated');
      } else {
        await supabase.from('highlights').insert([data]);
        toast.success('Highlight created');
      }
      setHighlightForm({ imageUrl: '' });
      setEditingId(null);
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRoleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      const data = { email: roleForm.email, role_news: roleForm.role_news, role_events: roleForm.role_events, role_members: roleForm.role_members };
      if (editingId) {
        await supabase.from('user_roles').update(data).eq('id', editingId);
        toast.success('Role updated');
      } else {
        await supabase.from('user_roles').insert([data]);
        toast.success('Role assigned');
      }
      setRoleForm({ email: '', role_news: false, role_events: false, role_members: false });
      setEditingId(null);
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteItem = async (table: string, id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await supabase.from(table).delete().eq('id', id);
      toast.success('Deleted successfully');
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>;

  const tabs = [];
  if (userPerms.events) tabs.push('events');
  if (userPerms.news) tabs.push('news');
  if (userPerms.members) tabs.push('members');
  if (userPerms.isSuper) {
    tabs.push('highlights', 'roles');
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold text-blue-600">ACM KFUEIT</Link>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-bold rounded-full">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-500 hidden sm:block">
              {currentUser?.email}
              {userPerms.isSuper && <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-bold">Super Admin</span>}
            </div>
            <button onClick={handleSignOut} className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-bold transition-colors">
              <LogOut size={18} /> <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {roleTableError && userPerms.isSuper && activeTab === 'roles' && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl">
            <h3 className="text-lg font-bold text-red-700 mb-2 flex items-center gap-2"><Code size={20}/> Database Setup Required for Roles</h3>
            <p className="text-red-600 mb-4">To use Role-Based Access Control (RBAC), you must execute the following SQL in your Supabase Dashboard SQL Editor.</p>
            <pre className="p-4 bg-gray-900 text-gray-100 rounded-xl overflow-x-auto text-sm">
{`CREATE TABLE user_roles (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  role_news boolean default false,
  role_events boolean default false,
  role_members boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);`}
            </pre>
            <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg font-bold shadow-sm">I have executed it, reload</button>
          </div>
        )}

        {highlightsTableError && userPerms.isSuper && activeTab === 'highlights' && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl">
            <h3 className="text-lg font-bold text-red-700 mb-2 flex items-center gap-2"><Code size={20}/> Database Setup Required for Highlights</h3>
            <p className="text-red-600 mb-4">To use the Highlights feature, you must execute the following SQL in your Supabase Dashboard SQL Editor.</p>
            <pre className="p-4 bg-gray-900 text-gray-100 rounded-xl overflow-x-auto text-sm">
{`CREATE TABLE highlights (
  id uuid default uuid_generate_v4() primary key,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);`}
            </pre>
            <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg font-bold shadow-sm">I have executed it, reload</button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab as any); setEditingId(null); }} className={`px-6 py-3 rounded-lg font-bold capitalize transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 shadow-sm border border-slate-200'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold mb-6 capitalize">{editingId ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}</h2>
          
          {activeTab === 'events' && (
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <input type="text" placeholder="Title" required value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg" />
              <textarea placeholder="Description" required value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg h-32"></textarea>
              <input type="date" required value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg" />
              <input type="url" placeholder="Image URL (e.g. https://images.unsplash.com/...)" value={eventForm.imageUrl} onChange={e => setEventForm({...eventForm, imageUrl: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg" />
              <button type="submit" disabled={isUploading} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold w-full">{isUploading ? 'Saving...' : 'Save Event'}</button>
            </form>
          )}

          {activeTab === 'news' && (
            <form onSubmit={handleNewsSubmit} className="space-y-4">
              <input type="text" placeholder="News Title" required value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg" />
              <textarea placeholder="Article Content" required value={newsForm.content} onChange={e => setNewsForm({...newsForm, content: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg h-32"></textarea>
              <input type="date" required value={newsForm.date} onChange={e => setNewsForm({...newsForm, date: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg" />
              <input type="text" placeholder="Author Name" value={newsForm.author} onChange={e => setNewsForm({...newsForm, author: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg" />
              <input type="url" placeholder="Image URL" value={newsForm.imageUrl} onChange={e => setNewsForm({...newsForm, imageUrl: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg" />
              <button type="submit" disabled={isUploading} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold w-full">{isUploading ? 'Saving...' : 'Save News'}</button>
            </form>
          )}

          {activeTab === 'members' && (
            <form onSubmit={handleMemberSubmit} className="space-y-4">
              <input type="text" placeholder="Name" required value={memberForm.name} onChange={e => setMemberForm({...memberForm, name: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg" />
              <input type="text" placeholder="Role (e.g. President, Design Head)" required value={memberForm.role} onChange={e => setMemberForm({...memberForm, role: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg" />
              <input type="url" placeholder="Image URL" value={memberForm.imageUrl} onChange={e => setMemberForm({...memberForm, imageUrl: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg" />
              <button type="submit" disabled={isUploading} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold w-full">{isUploading ? 'Saving...' : 'Save Member'}</button>
            </form>
          )}

          {activeTab === 'highlights' && !highlightsTableError && (
            <form onSubmit={handleHighlightSubmit} className="space-y-4">
              <input type="url" placeholder="Image URL (e.g. https://images.unsplash.com/...)" required value={highlightForm.imageUrl} onChange={e => setHighlightForm({...highlightForm, imageUrl: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg" />
              <button type="submit" disabled={isUploading} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold w-full">{isUploading ? 'Saving...' : 'Save Highlight'}</button>
            </form>
          )}

          {activeTab === 'roles' && !roleTableError && (
             <form onSubmit={handleRoleSubmit} className="space-y-4">
              <input type="email" placeholder="User Email Address" required value={roleForm.email} onChange={e => setRoleForm({...roleForm, email: e.target.value})} className="w-full p-3 border border-slate-300 rounded-lg" />
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
                <label className="flex items-center gap-2 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="checkbox" checked={roleForm.role_events} onChange={e => setRoleForm({...roleForm, role_events: e.target.checked})} className="w-5 h-5 text-blue-600 rounded" />
                  <span className="font-bold">Can Add Events</span>
                </label>
                <label className="flex items-center gap-2 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="checkbox" checked={roleForm.role_news} onChange={e => setRoleForm({...roleForm, role_news: e.target.checked})} className="w-5 h-5 text-blue-600 rounded" />
                  <span className="font-bold">Can Add News</span>
                </label>
                <label className="flex items-center gap-2 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="checkbox" checked={roleForm.role_members} onChange={e => setRoleForm({...roleForm, role_members: e.target.checked})} className="w-5 h-5 text-blue-600 rounded" />
                  <span className="font-bold">Can Add Members</span>
                </label>
              </div>

              <button type="submit" disabled={isUploading} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold w-full">{isUploading ? 'Saving...' : 'Assign Roles'}</button>
            </form>
          )}

        </div>

        {/* Lists */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6 capitalize">Manage {activeTab}</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {activeTab === 'events' && events.map(e => (
              <div key={e.id} className="flex justify-between items-center p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <div><h3 className="font-bold">{e.title}</h3><p className="text-sm text-slate-500">{new Date(e.date).toLocaleDateString()}</p></div>
                <div className="flex gap-2">
                  <button onClick={() => deleteItem('events', e.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                </div>
              </div>
            ))}
            {activeTab === 'news' && news.map(n => (
              <div key={n.id} className="flex justify-between items-center p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <div><h3 className="font-bold">{n.title}</h3><p className="text-sm text-slate-500">{new Date(n.date).toLocaleDateString()}</p></div>
                <div className="flex gap-2">
                  <button onClick={() => deleteItem('news', n.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                </div>
              </div>
            ))}
            {activeTab === 'highlights' && !highlightsTableError && highlights.map(h => (
              <div key={h.id} className="flex justify-between items-center p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <div><img loading="lazy" src={h.image_url} alt="Highlight" className="w-20 h-20 object-cover rounded-lg border border-slate-200" /></div>
                <div className="flex gap-2">
                  <button onClick={() => deleteItem('highlights', h.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                </div>
              </div>
            ))}
            {activeTab === 'roles' && !roleTableError && userRoles.map(r => (
              <div key={r.id} className="flex justify-between items-center p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <div>
                  <h3 className="font-bold">{r.email}</h3>
                  <div className="flex gap-2 mt-1">
                    {r.role_events && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-bold">Events</span>}
                    {r.role_news && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-bold">News</span>}
                    {r.role_members && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-bold">Members</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => deleteItem('user_roles', r.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                </div>
              </div>
            ))}
            {activeTab === 'members' && members.map(m => (
              <div key={m.id} className="flex justify-between items-center p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <div><h3 className="font-bold">{m.name}</h3><p className="text-sm text-slate-500">{m.role}</p></div>
                <div className="flex gap-2">
                  <button onClick={() => deleteItem('members', m.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
