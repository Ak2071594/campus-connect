import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Clubs from "./pages/Clubs";
import ClubProfile from "./pages/ClubProfile";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import Messages from "./pages/Messages";
import Requests from "./pages/Requests";
import CreateRequest from "./pages/CreateRequest";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Volunteers from "./pages/Volunteers";
import Collaboration from "./pages/Collaboration";
import Results from "./pages/Results";
import Oversight from "./pages/Oversight";
import ActivityLogs from "./pages/ActivityLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <MainLayout>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        <Route path="/" element={isAuthenticated ? <Index /> : <Navigate to="/login" />} />
        <Route path="/clubs" element={isAuthenticated ? <Clubs /> : <Navigate to="/login" />} />
        <Route path="/clubs/:id" element={isAuthenticated ? <ClubProfile /> : <Navigate to="/login" />} />
        <Route path="/events" element={isAuthenticated ? <Events /> : <Navigate to="/login" />} />
        <Route path="/events/:id" element={isAuthenticated ? <EventDetails /> : <Navigate to="/login" />} />
        <Route path="/events/create" element={isAuthenticated ? <CreateEvent /> : <Navigate to="/login" />} />
        <Route path="/messages" element={isAuthenticated ? <Messages /> : <Navigate to="/login" />} />
        <Route path="/requests" element={isAuthenticated ? <Requests /> : <Navigate to="/login" />} />
        <Route path="/requests/create" element={isAuthenticated ? <CreateRequest /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/volunteers" element={isAuthenticated ? <Volunteers /> : <Navigate to="/login" />} />
        <Route path="/collaboration" element={isAuthenticated ? <Collaboration /> : <Navigate to="/login" />} />
        <Route path="/results" element={isAuthenticated ? <Results /> : <Navigate to="/login" />} />
        <Route path="/oversight" element={isAuthenticated ? <Oversight /> : <Navigate to="/login" />} />
        <Route path="/activity-logs" element={isAuthenticated ? <ActivityLogs /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
