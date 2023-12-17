'use client'

import { ButtonPrimary } from "@/components/buttons/button-primary";
import { ButtonSecondary } from "@/components/buttons/button-secondary";
import { InputText } from "@/components/forms-components/input-text";
import { useForm } from "@/hooks/useForm"
import { api } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { setCookies } from "./actions";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const email = useForm();
  const password = useForm();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      { error && setError(false) }

      if (email.validate() && password.validate()) {
        const { success, user, access_token } = await api.post('auth/login', {
          email: email.value,
          password: password.value
        }).then(res => res.data);

        if (success) {
          api.defaults.headers['Authorization'] = `Bearer ${access_token}`;
          setCookies('user', JSON.stringify(user));
          setCookies('access_token', access_token);

          router.push('/admin');
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center flex-col gap-6">
      <div className="w-full max-w-md flex items-center flex-col gap-6">
        <div className="flex flex-col items-center">
          <Image src='logo.svg' alt='Logo' width={91} height={82} />
          <h2 className="text-xl font-semibold text-gray-800 mt-4">Boas vindas ao Mind Ease!</h2>
          <span className="text-base font-light text-gray-800">Seu espaço de compra e venda</span>
        </div>
        <form className="w-full max-w-md flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
          <InputText
            id="email"
            title="Email"
            type="email"
            placeholder="Insira o seu email"
            {...email}
          />
          <InputText
            id="password"
            title="Senha"
            type="password"
            placeholder="Insira a sua senha"
            {...password}
          />
          {error && <span className="px-3 h-12 flex items-center bg-red-100 text-red-500 font-medium rounded-md">Erro ao fazer login, tente novamente.</span>}
          <div className="flex justify-end">
            <Link href={'/forgot-password'} className="font-medium">Esqueceu a senha?</Link>
          </div>
          <ButtonPrimary
            title="Entrar"
            full={true}
            onClick={() => handleSubmit()}
          />
        </form>
        <span>Ainda não tem acesso?</span>
        <ButtonSecondary
          title="Criar uma conta"
          full={true}
        />
      </div>
    </main>
  )
}
