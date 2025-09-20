import { useScrollToTop } from '@/hooks/useScrollToTop';

interface ScrollToTopProps {
  children: React.ReactNode;
}

export default function ScrollToTop({ children }: ScrollToTopProps) {
  useScrollToTop();
  return <>{children}</>;
}
