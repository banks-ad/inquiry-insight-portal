
export const shouldShowSidebar = (pathname: string): boolean => {
  return pathname.includes('/commissions') || pathname.startsWith('/reports/');
};
