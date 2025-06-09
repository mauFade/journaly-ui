import React from "react";
import LoginForm from "./components/login-form";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <LockKeyhole className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <p className="text-muted-foreground text-center mt-2">
            Entre com suas credenciais para acessar sua conta
          </p>
        </div>

        <LoginForm />

        <p className="text-sm text-muted-foreground text-center mt-6">
          Não tem uma conta?{" "}
          <Link
            href="/signup"
            className="text-primary font-medium hover:underline transition-colors"
          >
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
