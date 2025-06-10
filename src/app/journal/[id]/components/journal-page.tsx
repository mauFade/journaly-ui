"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Clock,
  Trash2,
  BookOpen,
  Eye,
  EyeOff,
  Loader2,
  Save,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { JournalEntry } from "@/api/types/journal";

interface PropsInterface {
  id: string;
}

const JournalPageDetail = (props: PropsInterface) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(true);

  const [currentEntry, setCurrentEntry] = useState<JournalEntry>({
    id: "",
    title: "",
    content: "",
    created_at: new Date(),
    updated_at: new Date(),
    wordCount: 0,
  });

  const {
    data: entry,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["journal", props.id],
    queryFn: () => api.getJournalById(props.id),
  });

  useEffect(() => {
    if (entry) setCurrentEntry(entry);
  }, [entry]);

  const updateMutation = useMutation({
    mutationFn: (data: JournalEntry) => {
      return api.updateJournal(data.id, { ...data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal", "user-journals"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return api.deleteJournal(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journal", "user-journals"] });
    },
  });

  const onUpdateJournal = () => {
    const wordCount = currentEntry.content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    const updatedJournal = { ...currentEntry, wordCount };

    updateMutation.mutate(updatedJournal);
  };

  const onDeleteJournal = () => {
    if (
      confirm(
        "Tem certeza que deseja excluir esta entrada? Esta ação não pode ser desfeita."
      )
    ) {
      deleteMutation.mutate(currentEntry.id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg">Carregando entrada...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.push("/journal")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <Alert variant="destructive">
            <AlertTitle>Erro ao carregar a entrada</AlertTitle>
            <AlertDescription>
              {error instanceof Error
                ? error.message
                : "Ocorreu um erro ao buscar os dados. Tente novamente."}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const readingTime = Math.ceil(currentEntry.wordCount / 200);

  return (
    <div className="min-h-screen">
      <div className="bg-background">
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push("/journal")}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="font-medium">Voltar ao Diário</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                >
                  {isPreviewMode ? (
                    <EyeOff className="h-4 w-4 mr-2" />
                  ) : (
                    <Eye className="h-4 w-4 mr-2" />
                  )}
                  {isPreviewMode ? "Editar" : "Visualizar"}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDeleteJournal}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-2" />
                  )}
                  Excluir
                </Button>

                {!isPreviewMode && (
                  <Button
                    size="sm"
                    onClick={onUpdateJournal}
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Salvar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {format(
                  new Date(currentEntry.created_at),
                  "EEEE, dd 'de' MMMM 'de' yyyy",
                  {
                    locale: ptBR,
                  }
                )}
              </div>

              <Separator orientation="vertical" className="h-4" />

              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {currentEntry.wordCount} palavras
              </div>

              <Separator orientation="vertical" className="h-4" />

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />~{readingTime} min de leitura
              </div>
            </div>
          </div>

          <Input
            value={currentEntry.title}
            onChange={(e) =>
              setCurrentEntry({ ...currentEntry, title: e.target.value })
            }
            className="text-4xl font-bold mb-8 border-none px-0 bg-transparent dark:text-white dark:placeholder:text-gray-400"
            placeholder="Título da entrada..."
          />

          <Textarea
            value={currentEntry.content}
            onChange={(e) =>
              setCurrentEntry({ ...currentEntry, content: e.target.value })
            }
            className="min-h-[600px] resize-none border-none px-0 text-base leading-relaxed bg-transparent dark:text-white dark:placeholder:text-gray-400 focus-visible:ring-0"
            placeholder="Escreva sobre seu dia..."
          />

          <div className="mt-12 pt-8 border-t">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div>
                Criado em{" "}
                {format(
                  new Date(currentEntry.created_at),
                  "dd/MM/yyyy 'às' HH:mm",
                  {
                    locale: ptBR,
                  }
                )}
              </div>

              <div>
                Última edição em{" "}
                {format(
                  new Date(currentEntry.updated_at),
                  "dd/MM/yyyy 'às' HH:mm",
                  {
                    locale: ptBR,
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalPageDetail;
