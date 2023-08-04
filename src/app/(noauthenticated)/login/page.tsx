"use client";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { connect } from "react-redux";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { handleSingIn } from "@/redux/singIn/singInActions";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from "next/navigation";

const AcessValidation = z.object({
  email: z.string().email({
    message: "E-mail inválido. Por favor insira um endereço de e-mail válido",
  }),
  password: z.string().min(4, { message: "A senha de usuário deve ter 4 caracteres ou mais" }),
});

type FormInput = z.infer<typeof AcessValidation>;

interface Props {
  handleSingIn: (data: any) => Promise<any>;
  accessToken: string,
}

function LoginPage(props: Props) {
  const { register, handleSubmit, formState: { errors }, } = useForm<FormInput>({
    resolver: zodResolver(AcessValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { accessToken, handleSingIn } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 3000);
  }, []);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    setIsLoading(true);
    handleSingIn(data).then(() => {
      setIsLoading(false);
      router.push("/");
    });
  };

  return (
    <>
      <main className="flex min-h-screen bg-slate-50 items-center justify-center">
        <Card className="w-[450px]">
          <CardHeader className="flex items-center justify-center">
            <Image src={Logo} width={210} alt="Picture of the author" />
            <CardDescription>
              Bem vindo a nova versão do painel administrativo de gestão de rotas
              e alunos da CNIT.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <Label className="sr-only" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="mb-2"
                    {...register('email')}
                  />
                  <p>{errors?.email?.message && <p>{errors.email.message}</p>}</p>
                  <Input
                    id="password"
                    placeholder="**********"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect="off"
                    disabled={isLoading}
                    className="mb-2"
                    {...register('password')}
                  />
                  <p>{errors?.password?.message && <p>{errors.password.message}</p>}</p>
                </div>
                <Button disabled={isLoading}>
                  {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
                  Entrar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main >
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    accessToken: (state.singin.auth && state.singin.auth.accessToken) || null,
  };
};
export default connect(mapStateToProps, {
  handleSingIn
})(LoginPage);
