import React, { createContext, useContext, useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarContextType {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  state: 'expanded',
  open: true,
  setOpen: () => {},
  openMobile: false,
  setOpenMobile: () => {},
  isMobile: false,
  toggleSidebar: () => {},
});

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultState?: 'expanded' | 'collapsed';
}

export function SidebarProvider({
  children,
  defaultState = 'expanded',
}: SidebarProviderProps) {
  const [state, setState] = useState<'expanded' | 'collapsed'>(defaultState);
  const [open, setOpen] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const isMobile = useIsMobile();

  // Toggle sidebar on non-mobile devices
  const toggleSidebar = () => {
    setState(state === 'expanded' ? 'collapsed' : 'expanded');
  };

  // Close mobile sidebar when resizing to desktop
  useEffect(() => {
    if (!isMobile) {
      setOpenMobile(false);
    }
  }, [isMobile]);

  // Handle escape key to close mobile sidebar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openMobile) {
        setOpenMobile(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openMobile]);

  // Handle document body overflow when mobile sidebar is open
  useEffect(() => {
    if (openMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openMobile]);

  return (
    <SidebarContext.Provider value={{
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}