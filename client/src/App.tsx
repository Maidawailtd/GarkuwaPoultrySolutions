import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { useAuthStore } from "./lib/store";
import { ErrorHandler } from "@/components/ui/error-handler";

// Pages
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/dashboard/Dashboard";
import Projects from "@/pages/projects/Projects";
import ProjectDetail from "@/pages/projects/ProjectDetail";
import CreateProject from "@/pages/projects/CreateProject";
import Profile from "@/pages/profile/Profile";
import EditProfile from "@/pages/profile/EditProfile";
import Freelancers from "@/pages/freelancers/Freelancers";
import FreelancerDetail from "@/pages/freelancers/FreelancerDetail";
import Messages from "@/pages/messages/Messages";
import Contracts from "@/pages/contracts/Contracts";
import ContractDetail from "@/pages/contracts/ContractDetail";

// Guards and wrappers
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicOnlyRoute from "./components/auth/PublicOnlyRoute";
import { MainLayout } from "./components/layout/MainLayout";
import { DashboardLayout } from "./components/layout/DashboardLayout";

function Router() {
  const [location] = useLocation();
  const { isAuthenticated, user } = useAuthStore();

  // Only log in development mode
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log(`Route changed: ${location}`);
      console.log(`Auth state:`, { isAuthenticated, user });
    }
  }, [location, isAuthenticated, user]);

  return (
    <Switch>
      {/* Public routes */}
      <Route path="/">
        {() => (
          <MainLayout>
            <Home />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/login">
        {() => (
          <PublicOnlyRoute>
            <MainLayout showFooter={false}>
              <Login />
            </MainLayout>
          </PublicOnlyRoute>
        )}
      </Route>
      
      <Route path="/register">
        {() => (
          <PublicOnlyRoute>
            <MainLayout showFooter={false}>
              <Register />
            </MainLayout>
          </PublicOnlyRoute>
        )}
      </Route>
      
      <Route path="/projects">
        {() => (
          <MainLayout>
            <Projects />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/projects/:id">
        {(params) => (
          <MainLayout>
            <ProjectDetail id={Number(params.id)} />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/freelancers">
        {() => (
          <MainLayout>
            <Freelancers />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/freelancers/:id">
        {(params) => (
          <MainLayout>
            <FreelancerDetail id={Number(params.id)} />
          </MainLayout>
        )}
      </Route>
      
      {/* Private/authenticated routes */}
      <Route path="/dashboard">
        {() => (
          <PrivateRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </PrivateRoute>
        )}
      </Route>
      
      <Route path="/create-project">
        {() => (
          <PrivateRoute requiredRole="CLIENT">
            <DashboardLayout>
              <CreateProject />
            </DashboardLayout>
          </PrivateRoute>
        )}
      </Route>
      
      <Route path="/profile">
        {() => (
          <PrivateRoute>
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          </PrivateRoute>
        )}
      </Route>
      
      <Route path="/edit-profile">
        {() => (
          <PrivateRoute>
            <DashboardLayout>
              <EditProfile />
            </DashboardLayout>
          </PrivateRoute>
        )}
      </Route>
      
      <Route path="/messages">
        {() => (
          <PrivateRoute>
            <DashboardLayout>
              <Messages />
            </DashboardLayout>
          </PrivateRoute>
        )}
      </Route>
      
      <Route path="/contracts">
        {() => (
          <PrivateRoute>
            <DashboardLayout>
              <Contracts />
            </DashboardLayout>
          </PrivateRoute>
        )}
      </Route>
      
      <Route path="/contracts/:id">
        {(params) => (
          <PrivateRoute>
            <DashboardLayout>
              <ContractDetail id={Number(params.id)} />
            </DashboardLayout>
          </PrivateRoute>
        )}
      </Route>
      
      {/* Fallback */}
      <Route>
        {() => (
          <MainLayout>
            <NotFound />
          </MainLayout>
        )}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorHandler>
          <Toaster />
          <Router />
        </ErrorHandler>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
