import { JournalEntry } from "./types/journal";
import { AuthenticateData, CreateUserData } from "./types/user";

class Api {
  public async login(data: AuthenticateData): Promise<{ token: string }> {
    return { token: "a" };
  }

  public async signUp(data: CreateUserData): Promise<{ token: string }> {
    return { token: "a" };
  }

  public async getJournals(): Promise<JournalEntry[]> {
    return [
      {
        id: "1",
        title: "Um dia bom",
        content:
          "Hoje foi um dia muito produtivo. Consegui terminar o projeto que estava desenvolvendo há semanas...",
        created_at: new Date(2024, 11, 8),
        updated_at: new Date(2024, 11, 9),
        wordCount: 245,
      },
      {
        id: "2",
        title: "Reflexões sobre mudanças",
        content:
          "Tenho pensado muito sobre as mudanças que quero fazer na minha vida. É interessante como...",
        created_at: new Date(2024, 11, 7),
        updated_at: new Date(2024, 11, 9),
        wordCount: 189,
      },
      {
        id: "3",
        title: "Fim de semana relaxante",
        content:
          "O fim de semana foi exatamente o que eu precisava. Passei tempo com a família...",
        created_at: new Date(2024, 11, 6),
        updated_at: new Date(2024, 11, 9),
        wordCount: 156,
      },
    ];
  }

  public async getJournalById(id: string): Promise<JournalEntry | undefined> {
    return [
      {
        id: "1",
        title: "Um dia bom",
        content:
          "Hoje foi um dia muito produtivo. Consegui terminar o projeto que estava desenvolvendo há semanas...",
        created_at: new Date(2024, 11, 8),
        updated_at: new Date(2024, 11, 9),
        wordCount: 245,
      },
      {
        id: "2",
        title: "Reflexões sobre mudanças",
        content:
          "Tenho pensado muito sobre as mudanças que quero fazer na minha vida. É interessante como...",
        created_at: new Date(2024, 11, 7),
        updated_at: new Date(2024, 11, 9),
        wordCount: 189,
      },
      {
        id: "3",
        title: "Fim de semana relaxante",
        content:
          "O fim de semana foi exatamente o que eu precisava. Passei tempo com a família...",
        created_at: new Date(2024, 11, 6),
        updated_at: new Date(2024, 11, 9),
        wordCount: 156,
      },
    ].find((i) => i.id === id);
  }
}

export const api = new Api();
