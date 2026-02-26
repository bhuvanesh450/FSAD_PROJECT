import { createContext, useContext, useState, useCallback } from 'react';

// ─── Helpers ───
let _nid = 100;
export const uid = () => ++_nid;
export const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// ─── Auto-reply pool for chat ───
export const REP_NAMES = ['Sarah', 'James', 'Emma', 'Michael', 'Lisa', 'David'];
const REPLIES = [
  "Great question! We're really excited to connect with talented folks like you! 🚀",
  "Our team collaborates across 12 countries — diverse and world-class.",
  "Compensation: salary, equity, $5K learning budget, full health coverage. 💎",
  "Interview process: take-home → 2 tech rounds → CTO chat. ~2 weeks total.",
  "Fully remote-first with quarterly team summits. Work from anywhere! 🌍",
  "Our last round was $80M Series C — massive growth ahead, great time to join!",
  "80% of senior engineers were promoted from within. Growth is our priority.",
  "We look for curiosity, ownership, and the drive to make things 10x better.",
];

// ─── Seed data ───
const SEED_STUDENTS = [
  { id: 1, name: 'Alex Johnson', email: 'alex@student.edu', pass: 'pass123', university: 'MIT', major: 'Computer Science', registeredFairs: [], resumes: [] },
];
const SEED_FAIRS = [
  { id: 10, title: 'Spring Tech Career Fair 2025', banner: '🌸', date: 'April 10, 2025', time: '10:00 AM – 4:00 PM', status: 'upcoming', capacity: 500, regCount: 142, description: 'Connect with top tech companies looking for engineers, data scientists, and PMs.' },
  { id: 11, title: 'Finance & Business Fair',       banner: '💼', date: 'March 28, 2025', time: '9:00 AM – 3:00 PM',  status: 'upcoming', capacity: 300, regCount: 87,  description: 'Meet leading investment banks, consulting firms, and fintech startups.' },
  { id: 12, title: 'Healthcare & Life Sciences',    banner: '🏥', date: 'Feb 15, 2025',   time: '11:00 AM – 5:00 PM', status: 'completed',capacity: 200, regCount: 200, description: 'Opportunities in biotech, pharma, and healthcare IT.' },
];
const SEED_COMPANIES = [
  { id: 20, name: 'NovaTech AI',    logo: '🤖', color: '#00f5ff', industry: 'Artificial Intelligence', location: 'San Francisco, CA', size: '500–1000', fairId: 10, roles: ['ML Engineer', 'AI Researcher', 'Backend Engineer'], desc: 'Building the future of AI infrastructure.' },
  { id: 21, name: 'QuantumLeap',    logo: '⚡', color: '#7c3aed', industry: 'Quantum Computing',       location: 'Austin, TX',         size: '100–500',  fairId: 10, roles: ['Quantum Engineer', 'Research Scientist'],         desc: 'Pioneering quantum computing for enterprise.' },
  { id: 22, name: 'GreenGrid',      logo: '🌱', color: '#00ff88', industry: 'Clean Energy',            location: 'New York, NY',       size: '1000+',    fairId: 11, roles: ['Energy Analyst', 'Data Engineer'],                desc: 'Accelerating the transition to sustainable energy.' },
  { id: 23, name: 'MediScan Pro',   logo: '🔬', color: '#ff006e', industry: 'Healthcare Tech',         location: 'Boston, MA',         size: '200–500',  fairId: 12, roles: ['Biomedical Engineer', 'UX Designer'],             desc: 'Revolutionizing diagnostics with AI imaging.' },
];

// ─── Context ───
const DBCtx = createContext(null);

export function DBProvider({ children }) {
  const [students,    setStudents]    = useState(SEED_STUDENTS);
  const [fairs,       setFairs]       = useState(SEED_FAIRS);
  const [companies,   setCompanies]   = useState(SEED_COMPANIES);
  const [chats,       setChats]       = useState({});
  const [repNames,    setRepNames]    = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);

  // Student actions
  const addStudent    = useCallback(s  => setStudents(p => [...p, s]), []);
  const updateStudent = useCallback((id, upd) => setStudents(p => p.map(s => s.id === id ? { ...s, ...upd } : s)), []);

  // Fair actions
  const addFair    = useCallback(f  => setFairs(p => [...p, f]), []);
  const updateFair = useCallback((id, upd) => setFairs(p => p.map(f => f.id === id ? { ...f, ...upd } : f)), []);
  const deleteFair = useCallback(id => setFairs(p => p.filter(f => f.id !== id)), []);

  // Company actions
  const addCompany    = useCallback(c  => setCompanies(p => [...p, c]), []);
  const updateCompany = useCallback((id, upd) => setCompanies(p => p.map(c => c.id === id ? { ...c, ...upd } : c)), []);
  const deleteCompany = useCallback(id => setCompanies(p => p.filter(c => c.id !== id)), []);

  // Chat actions
  const addChatMsg = useCallback((coId, msg) =>
    setChats(p => ({ ...p, [coId]: [...(p[coId] || []), msg] })), []);

  const getOrCreateRep = useCallback(coId => {
    if (repNames[coId]) return repNames[coId];
    const name = REP_NAMES[Math.floor(Math.random() * REP_NAMES.length)];
    setRepNames(p => ({ ...p, [coId]: name }));
    return name;
  }, [repNames]);

  const sendAutoReply = useCallback((coId, repName) => {
    const text = REPLIES[Math.floor(Math.random() * REPLIES.length)];
    setTimeout(() => addChatMsg(coId, { id: uid(), sender: repName, text, time: now(), isRep: true }),
      1200 + Math.random() * 800);
  }, [addChatMsg]);

  // Auth helpers
  const registerFair = useCallback((userId, fairId) => {
    setStudents(p => p.map(s => s.id === userId ? { ...s, registeredFairs: [...s.registeredFairs, fairId] } : s));
    setFairs(p => p.map(f => f.id === fairId ? { ...f, regCount: f.regCount + 1 } : f));
    setCurrentUser(p => p?.id === userId ? { ...p, registeredFairs: [...p.registeredFairs, fairId] } : p);
  }, []);

  const unregisterFair = useCallback((userId, fairId) => {
    setStudents(p => p.map(s => s.id === userId ? { ...s, registeredFairs: s.registeredFairs.filter(id => id !== fairId) } : s));
    setFairs(p => p.map(f => f.id === fairId ? { ...f, regCount: Math.max(0, f.regCount - 1) } : f));
    setCurrentUser(p => p?.id === userId ? { ...p, registeredFairs: p.registeredFairs.filter(id => id !== fairId) } : p);
  }, []);

  const submitResume = useCallback((userId, resume) => {
    setStudents(p => p.map(s => s.id === userId ? { ...s, resumes: [...s.resumes, resume] } : s));
    setCurrentUser(p => p?.id === userId ? { ...p, resumes: [...p.resumes, resume] } : p);
  }, []);

  const login  = useCallback((user, role) => { setCurrentUser(user); setCurrentRole(role); }, []);
  const logout = useCallback(() => { setCurrentUser(null); setCurrentRole(null); }, []);

  return (
    <DBCtx.Provider value={{
      students, fairs, companies, chats, currentUser, currentRole,
      addStudent, updateStudent,
      addFair, updateFair, deleteFair,
      addCompany, updateCompany, deleteCompany,
      addChatMsg, getOrCreateRep, sendAutoReply,
      registerFair, unregisterFair, submitResume,
      login, logout, setCurrentUser,
    }}>
      {children}
    </DBCtx.Provider>
  );
}

export const useDB = () => useContext(DBCtx);
