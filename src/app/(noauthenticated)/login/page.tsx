"use client";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { connect } from "react-redux";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import { handleSingIn } from "@/redux/singIn/singInActions";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Suspense } from 'react'

const AcessValidation = z.object({
  email: z.string().email({
    message: "E-mail inválido. Por favor insira um endereço de e-mail válido",
  }),
  password: z
    .string()
    .min(4, { message: "A senha de usuário deve ter 4 caracteres ou mais" }),
});

type FormInput = z.infer<typeof AcessValidation>;

interface Props {
  handleSingIn: (data: any) => Promise<any>;
  accessToken: string;
}

function LoginPage(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
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
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
      <Suspense fallback={<p>Loading feed...</p>}>
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Image src={Logo} width={210} alt="Picture of the author" />
              <Text fontSize={"lg"} color={"gray.600"} align={"center"}>
                Bem vindo a nova versão do painel administrativo de gestão de
                rotas e alunos da CNIT.
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4}>
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      disabled={isLoading}
                      {...register("email")}
                      focusBorderColor='primary.400'
                    />
                    {errors?.email?.message && (
                      <FormHelperText color={"red.400"}>{errors.email.message}</FormHelperText>
                    )}
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      id="password"
                      placeholder="**********"
                      type="password"
                      disabled={isLoading}
                      {...register("password")}
                      focusBorderColor='primary.400'
                    />
                    {errors?.password?.message && (
                      <FormHelperText color={"red.400"}>{errors.password.message}</FormHelperText>
                    )}
                  </FormControl>
                  <Stack spacing={10}>
                    <Button
                      type="submit"
                      bg={"primary.400"}
                      color={"white"}
                      _hover={{
                        bg: "orange.400",
                      }}
                    >
                      Entrar
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>     ]
      </Suspense>
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    accessToken: (state.singin.auth && state.singin.auth.accessToken) || null,
  };
};
export default connect(mapStateToProps, {
  handleSingIn,
})(LoginPage);
