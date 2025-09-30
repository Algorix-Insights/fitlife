"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/api/supabaseClient";

export default function registerComponent() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    birthDate: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    birthDate: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {
      username: "",
      email: "",
      birthDate: "",
      gender: "",
      password: "",
      confirmPassword: "",
    };

    // Validar usuario
    if (!formData.username) {
      newErrors.username = "El nombre de usuario es requerido";
    } else if (formData.username.length < 3) {
      newErrors.username =
        "El nombre de usuario debe tener al menos 3 caracteres";
    }

    // Validar correo
    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    // Validar fecha
    if (!formData.birthDate) {
      newErrors.birthDate = "La fecha es requerida";
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (age < 13) {
        newErrors.birthDate = "Debes tener al menos 13 años";
      } else if (age > 100) {
        newErrors.birthDate = "Fecha de nacimiento no válida";
      }
    }

    // Validar genero
    if (!formData.gender) {
      newErrors.gender = "El género es requerido";
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "La contraseña debe contener mayúsculas, minúsculas y números";
    }

    // Validar confirmación
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Step 1: Create user account with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        console.error("Error en registro:", authError);
        alert(`Error en el registro: ${authError.message}`);
        return;
      }

      if (!authData.user) {
        alert("Error: No se pudo crear el usuario");
        return;
      }

      // Check if email confirmation is required
      if (authData.user && !authData.session) {
        alert("¡Registro exitoso! Por favor, revisa tu email para confirmar tu cuenta antes de continuar.");
      }

      // Step 2: Create user profile with additional data in profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: authData.user.id, // Use the user ID from auth as profile ID
          name: formData.username,
          birthdate: formData.birthDate,
          gender: formData.gender,
        })
        .select()
        .single();

      if (profileError) {
        console.error("Error creando perfil:", profileError);
        alert(`Error creando perfil: ${profileError.message}`);
        return;
      }
      
      // Redirect to questionnaire to complete onboarding
      router.push("/questionnarie");

    } catch (error) {
      console.error("Error en registro:", error);
      alert("Error en el registro. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* lado derecho -- formulaio */}
      <div className="flex-1 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-20 xl:px-24 bg-purple-1000">
        <div className="mx-auto w-full max-w-md lg:w-96">
          <div className="text-center lg:text-center">
            <h2 className="text-3xl font-bold text-purple-1008">
              Registro a FitLife
            </h2>
            <p className="mt-2 text-lf font-semibold text-purple-1007">
              Crea tu cuenta y empieza a registrar tus metas
            </p>
          </div>

          <div className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Usuario */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-normal text-purple-1007"
                >
                  Nombre de Usuario
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-purple-1007 ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Bryan Chuc"
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.username}
                    </p>
                  )}
                </div>
              </div>

              {/* Correo */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-normal text-purple-1007"
                >
                  Correo Electrónico
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-purple-1007 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="bryan2509@gmail.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* fecha y genero*/}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* fecha nac */}
                <div>
                  <label
                    htmlFor="birthDate"
                    className="block text-sm font-normal text-purple-1007"
                  >
                    Fecha de nacimiento
                  </label>
                  <div className="mt-1">
                    <input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-purple-1007 ${
                        errors.birthDate ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.birthDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.birthDate}
                      </p>
                    )}
                  </div>
                </div>

                {/* genero */}
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-normal text-purple-1007"
                  >
                    Género
                  </label>
                  <div className="mt-1">
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`block w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-purple-1007 ${
                        errors.gender ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Personx</option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="prefiero-no-decir">
                        Prefiero no decir
                      </option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-normal text-purple-1007"
                >
                  Contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
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

              {/* Repetir Contraseña */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-normal text-purple-1007"
                >
                  Repetir Contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-purple-1007 ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* btn registro */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-1006 transition duration-300 cursor-pointer ease-in-out hover:bg-purple-1007 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creando cuenta..." : "Registrar"}
                </button>
              </div>
            </form>

            {/* ya tiene cuenta -> inicio de sesion */}
            <div className="mt-6 text-center">
              <p className="px-2 text-purple-1007">
                ¿Tienes una cuenta?{" "}
                <Link
                 href={"/auth/login"}
                  className="inline-flex items-center font-medium text-purple-1007 transition duration-200 ease-in-out cursor-pointer hover:text-purple-1008"
                >
                  Iniciar Sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* lado izquierdo - imagen*/}
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
