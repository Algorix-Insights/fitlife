"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function loginComponent() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    // validar correo
    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    // validar contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // conexion al supa
      console.log("Datos del login:", formData);

      // Simulacion de llamada api
      await new Promise((resolve) => setTimeout(resolve, 1500));

      
      // Aquí redirigirías a la verificación OTP después del registro exitoso
      // router.push('/verificacion-otp');
      
    } catch (error) {
      console.error("Error en login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar los errores
    if (errors[name as keyof typeof errors]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* lado izquierdo -- formulario */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-purple-1000">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-center">
            <h2 className="text-3xl font-bold text-purple-1008">
              Bienvenido FitLover
            </h2>
            <p className="mt-2 text-lg font-semibold text-purple-1007">
              Accede a tu cuenta y continúa con tu progreso
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-purple-1007"
                >
                  Correo Electrónico
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="bryan2509@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-purple-1007 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-purple-1007"
                >
                  Contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-purple-1007 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={() => router.push("/auth/otp")}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-1006 transition duration-300 cursor-pointer ease-in-out hover:bg-purple-1007 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar"}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-purple-1007">
                    ¿No tienes una cuenta?
                  </span>
                </div>
              </div>

              <div className="mt-1 text-center">
                {/* <button
                  onClick={() => router.push("/registro")}
                  className="inline-flex items-center font-medium text-purple-1007 transition duration-200 ease-in-out cursor-pointer hover:text-purple-1008 hover:"
                >
                  Regístrate
                </button> */}
                <Link
                  href={"/auth/register"}
                  className="inline-flex items-center font-medium text-purple-1007 transition duration-200 ease-in-out cursor-pointer hover:text-purple-1008 hover:"
                >
                  Regístrate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* lado derecho -- imagen */}
      <div className="hidden lg:block relative flex-1 bg-gray-50">
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
