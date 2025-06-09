class Api {
  public async login(data: { email: string; password: string }) {
    return { token: "a" };
  }
}

export const api = new Api();
