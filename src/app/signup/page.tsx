import React from "react";
import { SignupForm } from "./components/signup-form";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Crie sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Ou{" "}
            <a
              href="/login"
              className="font-medium text-primary hover:text-primary/80"
            >
              entre na sua conta existente
            </a>
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUpPage;
