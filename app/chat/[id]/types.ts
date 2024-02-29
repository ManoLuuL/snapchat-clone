export type ErrorProps = {
  error: Error & { digest?: string };
};

export type ChatHistoryPageProps = {
  params: { id: string };
};
