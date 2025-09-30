"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginComponent() {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("El correo es requerido");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: undefined,
        },
      });

      if (error) {
        console.error("Error enviando OTP:", error.message);
        setError("No se pudo enviar el código, intenta de nuevo.");
        return;
      }

      // Redirigir a la pantalla OTP con el correo en query
      router.push(`/auth/otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error("Error inesperado:", err);
      setError("Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:px-20 bg-purple-1000">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <h2 className="text-3xl font-bold text-purple-1008 text-center">
            Bienvenido FitLover
          </h2>
          <p className="mt-2 text-lg font-semibold text-purple-1007 text-center">
            Ingresa tu correo y te enviaremos un código de acceso
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-1007">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="mt-1 block w-full px-3 py-2 border rounded-md bg-white focus:ring-purple-1007 focus:outline-none"
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 rounded-md text-white bg-purple-1006 hover:bg-purple-1007 disabled:opacity-50"
            >
              {isLoading ? "Enviando código..." : "Enviar código"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-purple-1007">¿No tienes una cuenta?</span>
            <Link
              href="/auth/register"
              className="ml-1 text-purple-1007 hover:text-purple-1008 font-medium"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>

      {/* imgen lado izquierdo */}
      <div className="hidden lg:block relative flex-1">
        <Image
          src={"/peso-muerto.jpg"}
          alt={"imagen del inicio de sesión"}
          fill
          className="object-cover object-left"
        ></Image>
      </div>
    </div>
  );
}
