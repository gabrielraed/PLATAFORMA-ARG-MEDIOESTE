import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../common/Logo';
import { X, Lock, Mail, ShieldCheck, UserCheck, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, switchDemoUser } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup' | 'recover'>('signin');
  const [email, setEmail] = useState('ahmed@almansoor-office.ae');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState<UserRole>('FAMILY_OFFICE');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 text-left">
      <div className="relative w-full max-w-md bg-[#091120] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <Logo size="sm" showSubtitle={false} />
          <button
            onClick={onClose}
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-serif font-bold text-white">
            {mode === 'signin'
              ? 'Access AMBC Connect'
              : mode === 'signup'
              ? 'Apply for Institutional Access'
              : 'Recover Credentials'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'signin'
              ? 'Enter your accredited credentials to access bilateral data rooms.'
              : 'Submit corporate accreditation for bilateral verification.'}
          </p>
        </div>

        {/* Quick Demo Switcher Buttons */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="text-[10px] uppercase font-mono tracking-wider text-ambc-gold font-bold">
            Instant Demo Access:
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                switchDemoUser('investor_gcc');
                onClose();
              }}
              className="p-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-ambc-gold border border-amber-500/30 text-[11px] font-bold text-center"
            >
              GCC Investor
            </button>
            <button
              onClick={() => {
                switchDemoUser('company_arg');
                onClose();
              }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-[11px] font-bold text-center"
            >
              Argentine CEO
            </button>
            <button
              onClick={() => {
                switchDemoUser('admin');
                onClose();
              }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-[11px] font-bold text-center"
            >
              AMBC Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] text-slate-300 font-semibold mb-1">
              Work / Corporate Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-ambc-gold"
              />
            </div>
          </div>

          {mode !== 'recover' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] text-slate-300 font-semibold">Password</label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setMode('recover')}
                    className="text-[10px] text-ambc-gold hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-ambc-gold"
                />
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-[11px] text-slate-300 font-semibold mb-1">
                Organization Role Type
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-ambc-gold"
              >
                <option value="FAMILY_OFFICE">Family Office</option>
                <option value="INVESTOR">Institutional Investor / Fund</option>
                <option value="COMPANY">Argentine Corporation / Sponsor</option>
                <option value="STRATEGIC_PARTNER">Strategic Trade Partner</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md flex items-center justify-center gap-1.5 pt-3"
          >
            <span>{mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Apply Now' : 'Send Link'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="pt-2 text-center text-xs text-slate-400">
          {mode === 'signin' ? (
            <div>
              New organization?{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-ambc-gold font-bold hover:underline"
              >
                Apply for Accreditation
              </button>
            </div>
          ) : (
            <div>
              Already accredited?{' '}
              <button
                onClick={() => setMode('signin')}
                className="text-ambc-gold font-bold hover:underline"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
