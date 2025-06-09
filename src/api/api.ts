class Api {
  public async login(data: {
    email: string;
    password: string;
  }): Promise<{ token: string }> {
    return { token: "a" };
  }

  public async getJournals(): Promise<
    {
      id: string;
      title: string;
      content: string;
      date: Date;
      wordCount: number;
    }[]
  > {
    return [
      {
        id: "1",
        title: "Um dia bom",
        content:
          "Hoje foi um dia muito produtivo. Consegui terminar o projeto que estava desenvolvendo há semanas...",
        date: new Date(2024, 11, 8),
        wordCount: 245,
      },
      {
        id: "2",
        title: "Reflexões sobre mudanças",
        content:
          "Tenho pensado muito sobre as mudanças que quero fazer na minha vida. É interessante como...",
        date: new Date(2024, 11, 7),
        wordCount: 189,
      },
      {
        id: "3",
        title: "Fim de semana relaxante",
        content:
          "O fim de semana foi exatamente o que eu precisava. Passei tempo com a família...",
        date: new Date(2024, 11, 6),
        wordCount: 156,
      },
    ];
  }
}

export const api = new Api();
