
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Inquiries from "./pages/Inquiries";
import Commissions from "./pages/Commissions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inquiries" element={<Inquiries />} />
          <Route path="/commissions" element={<Commissions />} />
          <Route path="/reports/statement" element={<NotFound />} />
          <Route path="/reports/provider" element={<NotFound />} />
          <Route path="/reports/history" element={<NotFound />} />
          <Route path="/reports/commission-trends" element={<NotFound />} />
          <Route path="/reports/performance" element={<NotFound />} />
          <Route path="/reports/distribution" element={<NotFound />} />
          <Route path="/reports/quarterly" element={<NotFound />} />
          <Route path="/settings" element={<NotFound />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
