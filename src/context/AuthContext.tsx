import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  switchDemoUser: (key: keyof typeof DEMO_USERS) => void;
  updateUser: (updated: Partial<User>) => void;
  isRole: (roles: UserRole | UserRole[]) => boolean;
  canAccessChairmanDashboard: boolean;
  canAccessDealDesk: boolean;
  canAccessKrestonCrm: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('agbic_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEMO_USERS.chairman;
      }
    }
    return DEMO_USERS.chairman;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('agbic_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('agbic_user');
    }
  }, [currentUser]);

  const login = (email: string, role: UserRole = 'COMPANY_ADMIN') => {
    const existing = Object.values(DEMO_USERS).find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUser(existing);
      return;
    }
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role,
      title: 'Corporate Executive',
      companyName: 'Accredited Member Enterprise',
      country: 'Argentina',
      city: 'Buenos Aires',
      verificationStatus: 'COMPANY_VERIFIED',
      membershipTier: 'BUSINESS',
      onboardingCompleted: true,
    };
    setCurrentUser(newUser);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchDemoUser = (key: keyof typeof DEMO_USERS) => {
    if (DEMO_USERS[key]) {
      setCurrentUser(DEMO_USERS[key]);
    }
  };

  const updateUser = (updated: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updated });
    }
  };

  const isRole = (roles: UserRole | UserRole[]) => {
    if (!currentUser) return false;
    const array = Array.isArray(roles) ? roles : [roles];
    return array.includes(currentUser.role);
  };

  const canAccessChairmanDashboard = !!currentUser && (
    currentUser.role === 'CHAIRMAN' ||
    currentUser.role === 'SUPER_ADMIN' ||
    currentUser.role === 'EXECUTIVE_SECRETARY'
  );

  const canAccessDealDesk = !!currentUser && (
    currentUser.role === 'CHAIRMAN' ||
    currentUser.role === 'SUPER_ADMIN' ||
    currentUser.role === 'DEAL_DESK_MANAGER' ||
    currentUser.role === 'DEAL_DESK_ANALYST' ||
    currentUser.role === 'EXECUTIVE_SECRETARY'
  );

  const canAccessKrestonCrm = !!currentUser && (
    currentUser.role === 'CHAIRMAN' ||
    currentUser.role === 'SUPER_ADMIN' ||
    currentUser.role === 'PROFESSIONAL_SERVICES_MANAGER' ||
    currentUser.role === 'KRESTON_PROFESSIONAL'
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        logout,
        switchDemoUser,
        updateUser,
        isRole,
        canAccessChairmanDashboard,
        canAccessDealDesk,
        canAccessKrestonCrm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
