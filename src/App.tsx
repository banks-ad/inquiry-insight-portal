
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNavigation from "./components/layout/TopNavigation";
import AdvisorDashboard from "./pages/AdvisorDashboard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Inquiries from "./pages/Inquiries";
import Commissions from "./pages/Commissions";
import CommissionForecast from "./pages/CommissionForecast";
import ProviderSummary from "./pages/reports/ProviderSummary";
import ProviderPayment from "./pages/ProviderPayment";
import Payments from "./pages/Payments";
import AccountHistory from "./pages/reports/AccountHistory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <TopNavigation />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<AdvisorDashboard />} />
              <Route path="/dashboard" element={<Index />} />
              <Route path="/inquiries" element={<Inquiries />} />
              <Route path="/commissions" element={<Commissions />} />
              <Route path="/commission-forecast" element={<CommissionForecast />} />
              <Route path="/provider-payment" element={<ProviderPayment />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/reports/statement" element={<NotFound />} />
              <Route path="/reports/provider" element={<ProviderSummary />} />
              <Route path="/reports/account-history" element={<AccountHistory />} />
              <Route path="/reports/history" element={<NotFound />} />
              <Route path="/reports/commission-trends" element={<NotFound />} />
              <Route path="/reports/performance" element={<NotFound />} />
              <Route path="/reports/distribution" element={<NotFound />} />
              <Route path="/reports/quarterly" element={<NotFound />} />
              <Route path="/settings" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
