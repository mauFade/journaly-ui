export type JournalEntry = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  word_count: number;
  created_at: Date;
  updated_at: Date;
};

export type JournalRequest = {
  title: string;
  content: string;
  tags: string[];
  word_count: number;
};
