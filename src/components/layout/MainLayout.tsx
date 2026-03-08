import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AppSidebar } from './AppSidebar';
import { TopNav } from './TopNav';
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      
      <motion.div
        initial={false}
        animate={{ 
          marginLeft: isSidebarCollapsed ? 80 : 280 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="min-h-screen"
      >
        <TopNav />
        <main className="p-6">
          {children}
        </main>
      </motion.div>
    </div>
  );
}
