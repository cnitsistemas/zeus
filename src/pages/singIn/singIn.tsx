"use client";

import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Logo from "./../../assets/logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { connect } from "react-redux";
import { handleSingIn } from "@/redux/singIn/singInActions";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

function SingIn(props: any) {
  const { handleSingIn, setLoading } = props;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    // signIn("credentials", {
    //   email: email,
    //   password: password,
    // }).then(() => setIsLoading(false));

    handleSingIn({
      email: email,
      password: password,
    });
  }

  return (
    <>
      <Card className="w-[450px]">
        <CardHeader className="flex items-center justify-center">
          <Image src={Logo} width={210} alt="Picture of the author" />
          <CardDescription>
            Bem vindo a nova versão do painel administrativo de gestão de rotas
            e alunos da CNIT.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
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
                  onChange={(event: any) => setEmail(event.target.value)}
                  value={email}
                />
                <Input
                  id="password"
                  placeholder="**********"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isLoading}
                  onChange={(event: any) => setPassword(event.target.value)}
                  value={password}
                />
              </div>
              <Button disabled={isLoading}>
                {/* {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
                Sign In with Email
              </Button>
            </div>
          </form>
          {/* <Button onClick={() => setTheme("light")}>Light</Button>
          <Button onClick={() => setTheme("dark")}>Dark</Button> */}
        </CardContent>
      </Card>
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {};
};
export default connect(mapStateToProps, {
  handleSingIn,
})(SingIn);
