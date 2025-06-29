"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Calendar,
  Plus,
  Save,
  Search,
  FileText,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";
import { generateSmartTitle } from "@/lib/generate-journal-title";
import { useRouter } from "next/navigation";
import { JournalEntry, JournalRequest } from "@/api/types/journal";
import { toast } from "sonner";

const JournalPage = () => {
  const router = useRouter();

  const [currentEntry, setCurrentEntry] = useState<JournalEntry>({
    id: "",
    title: "",
    content: "",
    created_at: new Date(),
    updated_at: new Date(),
    word_count: 0,
    tags: [],
  });

  const { data } = useQuery({
    queryKey: ["user-journals"],
    queryFn: () => {
      return api.getJournals();
    },
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleContentChange = (content: string) => {
    const wordCount = content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    setCurrentEntry((prev) => ({
      ...prev,
      content,
      wordCount,
    }));
  };

  const filteredEntries = data
    ? data.filter(
        (entry) =>
          entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const { mutate } = useMutation({
    mutationFn: (data: JournalRequest) => {
      return api.createJournal(data);
    },
    onSuccess: (v) => {
      toast.success("Journal criado com sucesso!");
      router.push(`/journal/${v.id}`);
    },
    onError: () => {
      toast.error("Erro ao criar journal");
    },
  });

  const createNewEntry = () => {
    mutate({
      content: currentEntry.content,
      tags: [],
      title: generateSmartTitle(currentEntry.content),
      word_count: currentEntry.word_count,
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-80 border-r bg-background flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Meu Diário</h1>
            </div>
          </div>

          <Button
            onClick={createNewEntry}
            className="w-full mb-3 hover:cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Entrada
          </Button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar entradas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => router.push(`/journal/${entry.id}`)}
                className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 mb-2 ${
                  currentEntry.id === entry.id ? "bg-muted" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-sm line-clamp-1">
                    {entry.title || "Sem título"}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {entry.word_count} palavras
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {entry.content}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {format(entry.created_at, "dd 'de' MMMM", { locale: ptBR })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col bg-background">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {format(
                  currentEntry.created_at,
                  "EEEE, dd 'de' MMMM 'de' yyyy",
                  {
                    locale: ptBR,
                  }
                )}
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                {currentEntry.word_count} palavras
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-2" />
                Salvo automaticamente
              </Button>
              <Button
                size="sm"
                className="hover:cursor-pointer"
                onClick={createNewEntry}
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            <Textarea
              placeholder="Como foi seu dia hoje? Escreva sobre seus pensamentos, sentimentos, experiências..."
              value={currentEntry.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="flex-1 resize-none border-none px-0 text-base leading-relaxed placeholder:text-muted-foreground/50 focus-visible:ring-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
