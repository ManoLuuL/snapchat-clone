import { ReactNode } from "react";

export type AuthLayoutProps = {
  children: ReactNode;
};

export type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};
