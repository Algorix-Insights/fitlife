"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function VerificacionOTP() {
  const supabase = createClientComponentClient();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const params = useSearchParams();
  const email = params.get("email") || "";

  // Manejar el timer para reenviar código
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Manejar cambios en los inputs OTP
  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus al siguiente input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Manejar teclas para navegación entre inputs
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Pegar código OTP desde el portapapeles
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split("").slice(0, 6);
      setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);

      // Focus al último input con datos
      const lastFilledIndex = Math.min(newOtp.length - 1, 5);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (otp.some((digit) => digit === "")) {
      alert("Por favor, completa todos los dígitos del código");
      return;
    }

    const otpCode = otp.join("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: "email",
      });

      if (error) {
        console.error("Error verificando OTP:", error.message);
        alert("Código incorrecto o expirado");
        return;
      }

      console.log("Sesión iniciada:", data.session);
      router.push("/dashboard");
    } catch (err) {
      console.error("Error inesperado:", err);
      alert("Error al verificar el código");
    } finally {
      setIsLoading(false);
    }
  };

  // Reenviar código
  const handleResendCode = async () => {
    if (timer === 0 && email) {
      setTimer(60);
      await supabase.auth.signInWithOtp({ email });
      alert("Se ha reenviado un nuevo código a tu correo");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* OPT -- lado derecho*/}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-purple-1000">
        <div className="mx-auto w-full max-w-md lg:w-96">
          <div className="mb-8 text-left">
            <Link
              href="/"
              className="text-sm font-medium text-gray-1009 hover:text-purple-1008"
            >
              ← Volver
            </Link>
          </div>

          <div className="text-center lg:text-center">
            <h2 className="text-3xl font-bold text-purple-1008">
              Verificación OTP
            </h2>
            <p className="mt-2 text-semibold text-gray-1009">
              Hemos enviado un código de 6 dígitos a tu correo{" "}
              <span className="font-bold text-purple-1006">{email}</span>
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP */}
              <div>
                <label className="block text-sm font-medium text-purple-1008 mb-4">
                  Código de verificación
                </label>
                <div className="flex justify-center space-x-2 sm:space-x-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-purple-1007"
                    />
                  ))}
                </div>
              </div>

              {/* btn para checkout*/}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-1006 transition duration-300 cursor-pointer ease-in-out hover:bg-purple-1007 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  
                  {isLoading ? "Verificando..." : "Verificar"}
                </button>
              </div>
            </form>

            {/* Reenviar otp */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-1009">
                ¿No recibiste el código?{" "}
                <button
                  onClick={handleResendCode}
                  disabled={timer > 0}
                  className={`font-medium ${
                    timer > 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-purple-1006 hover:text-purple-1008"
                  }`}
                >
                  {timer > 0 ? `Reenviar en ${timer}s` : "Reenviar código"}
                </button>
              </p>
            </div>
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
