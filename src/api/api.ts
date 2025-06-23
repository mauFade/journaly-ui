import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

import { JournalEntry, JournalRequest } from "./types/journal";
import { AuthenticateData, CreateUserData, UserResponse } from "./types/user";

class Api {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    this.axios.interceptors.request.use((config) => {
      const apiKey = getCookie("jwtToken");
      if (apiKey) {
        config.headers["X-API-KEY"] = apiKey;
      }
      return config;
    });
  }

  public async login(req: AuthenticateData): Promise<UserResponse> {
    const { data } = await this.axios.post<UserResponse>("/auth", req);
    return data;
  }

  public async signUp(req: CreateUserData): Promise<UserResponse> {
    const { data } = await this.axios.post<UserResponse>("/users", req);
    return data;
  }

  public async createJournal(req: JournalRequest): Promise<JournalEntry> {
    const { data } = await this.axios.post<JournalEntry>("/journals", req);
    return data;
  }

  public async getJournals(): Promise<JournalEntry[]> {
    const { data } = await this.axios.get<JournalEntry[]>("/journals");
    return data;
  }

  public async getJournalById(id: string): Promise<JournalEntry> {
    const { data } = await this.axios.get<JournalEntry>(`/journals/${id}`);
    return data;
  }

  public async updateJournal(
    id: string,
    data: Partial<Omit<JournalEntry, "id" | "created_at" | "updated_at">>
  ): Promise<void> {
    await this.axios.put(`/journals/${id}`, data);
  }

  public async deleteJournal(id: string): Promise<void> {
    await this.axios.delete(`/journals/${id}`);
  }
}

export const api = new Api();
