"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { AtSign, KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { api } from "@/api/api";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: LoginFormData) => api.login(data),
    onSuccess: ({ token }) => {
      toast.success("Login realizado com sucesso");
      setCookie("token", token);
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Erro ao fazer login");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <Card className="border-border/40 shadow-lg">
      <CardHeader className="pb-4 space-y-1">
        <h2 className="text-xl font-semibold text-center">
          Bem-vindo de volta
        </h2>
        <p className="text-sm text-muted-foreground text-center">
          Insira seus dados para acessar sua conta
        </p>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Email</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                    <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Senha</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                    <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full font-medium group"
              type="submit"
              size="lg"
            >
              Fazer Login
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
