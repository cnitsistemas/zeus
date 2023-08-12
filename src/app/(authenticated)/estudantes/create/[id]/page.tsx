"use client";
import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  useColorMode,
  useToast
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ControlledSelect from "@/components/controller-select";
import { connect } from "react-redux";
import CustomInputMask from "@/components/input-mask";
import { useRouter } from "next/navigation";
import { fetchAddressByCEP, setCEP } from "@/redux/address/addressActions";
import InputMask from "react-input-mask";
import BreadcrumbComponent from "@/components/breadcrumb";
import { Select } from "chakra-react-select";
import { RouteOption } from "@/domain/route/routeDTO";
import { createStudents, editStudent } from "@/redux/students/studentsActions";

function StudentPage({
  params,
  routes,
  fetchRoutes,
  setCEP,
  fetchAddressByCEP,
  editStudent,
  createStudents
}: PropsStudent) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(FormValidation),
    defaultValues,
  });
  const { id } = params;
  const router = useRouter();
  const toast = useToast();
  const { colorMode } = useColorMode();
  const bgColorDivider = { light: "white", dark: "#1A202C" };
  const [routersList, setRoutersList] = useState<Array<any>>([]);
  const [selectedRoute, setSelectedRoute] = useState<RouteOption | null>(null);
  const [dataCEP, setDataCEP] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (routes && routes.length > 0) {
      setRoutersList(routes.map(route => { return { value: route.id, label: route.name } }));
    }
  }, [routes]);

  const updateRoutesList = (): void => {
    fetchRoutes();
  }

  const clearStatesForm = (): void => {
    reset(defaultValues);
    setSelectedRoute(null);
    setDataCEP('');
    setAddress('');
    setNeighborhood('');
    setNumber('');
    setComplement('');
    setCity('');
    setState('');
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    setIsLoading(true);
    const formData = {
      nome: data.name,
      serie: data.serie,
      ensino: data.teaching?.value,
      turno: data.shift.value,
      nome_escola: data.schoolName,
      hora_ida: data.departureTime,
      hora_volta: data.backTime,
      cep: dataCEP,
      endereco: address,
      bairro: neighborhood,
      numero: number,
      complemento: complement,
      cidade: city,
      estado: state,
      rota_id: selectedRoute?.value,
      _method: id !== "new" ? "PUT" : "POST"
    };

    if (id !== "new") {
      await editStudent({ id: id, data: formData }).then((res) => {
        if (res.success) {
          toast({
            title: 'Aluno Editado',
            description: "Aluno editado com sucesso!",
            status: 'success',
            duration: 7000,
            isClosable: true,
          })
          clearStatesForm();
          setIsLoading(false);
        } else {
          toast({
            title: 'Erro',
            description: "Erro ao editar aluno!",
            status: 'error',
            duration: 7000,
            isClosable: true,
          })
        }
      })
        .catch((e) => console.warn(e))

    } else {
      await createStudents(formData).then((res) => {
        if (res.success) {
          toast({
            title: 'Aluno Cadastrado',
            description: "Aluno cadastrado com sucesso!",
            status: 'success',
            duration: 7000,
            isClosable: true,
          })
          clearStatesForm();
          setIsLoading(false);
        } else {
          toast({
            title: 'Erro',
            description: "Erro ao cadastrar aluno!",
            status: 'error',
            duration: 7000,
            isClosable: true,
          })
        }
      })
        .catch((e) => console.warn(e))
    }

  };

  useEffect(() => {
    if (dataCEP && dataCEP.length === 9) {
      fetchAddressByCEP([{
        name: 'address-by-cep',
        type: 'error',
        callback: () => {
          console.warn('PostalCode.fetchAddressByCEP.error')
        }
      }, {
        name: 'address-by-cep',
        type: 'success',
        callback: (response: any) => {
          setAddress(response.main);
          setNeighborhood(response.neighborhood);
          setComplement(response.complement);
          setCity(response.city);
          setState(response.state);
        }
      }])
    }
  }, [dataCEP, fetchAddressByCEP])

  return (
    <>
      <Container maxW='container.2xl' px={{ xl: 20, sm: 0 }}>
        <BreadcrumbComponent breadcrumbItens={breadcrumbItens} />
        <Flex
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Flex flexDirection={"column"}>
            <Flex
              fontSize={8}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Heading size='lg' color="primary.400" mr={2}>Cadastrar Aluno</Heading>
            </Flex>
          </Flex>
        </Flex>
        <Box position='relative' py='8'>
          <Divider />
          <AbsoluteCenter bg={bgColorDivider[colorMode]} px='4'>
            Dados Pessoais
          </AbsoluteCenter>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} >
          <Grid templateColumns={{ '2xl': 'repeat(6, 1fr)', xl: 'repeat(3, 1fr)', sm: 'repeat(1, 1fr)', }} gap={4}>
            <GridItem colSpan={{ xl: 2, sm: 3 }}>
              <FormControl id="name" isInvalid={!!errors.name}>
                <FormLabel fontWeight="bold">Nome:</FormLabel>
                <Input
                  id="name"
                  placeholder="Nome"
                  type="text"
                  disabled={isLoading}
                  {...register("name")}
                  focusBorderColor='primary.400'
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ xl: 2, sm: 3 }}>
              <FormControl id="schoolName" isInvalid={!!errors.schoolName}>
                <FormLabel fontWeight="bold">Nome da Escola:</FormLabel>
                <Input
                  id="schoolName"
                  placeholder="Nome da Escola"
                  type="text"
                  disabled={isLoading}
                  {...register("schoolName")}
                  focusBorderColor='primary.400'
                />
                <FormErrorMessage>{errors.schoolName?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ xl: 2, sm: 3 }}>
              <FormControl id="serie" isInvalid={!!errors.serie}>
                <FormLabel fontWeight="bold">Série:</FormLabel>
                <Input
                  id="serie"
                  placeholder="Série"
                  type="text"
                  disabled={isLoading}
                  {...register("serie")}
                  focusBorderColor='primary.400'
                />
                <FormErrorMessage>{errors.serie?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <ControlledSelect<FormInput, SelectReason, true>
                name="teaching"
                control={control}
                label="Ensino:"
                placeholder="Ensino"
                options={teachingList}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <ControlledSelect<FormInput, SelectReason, true>
                name="shift"
                control={control}
                label="Turno:"
                placeholder="Turno"
                options={shiftList}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl id="route">
                <FormLabel fontWeight="bold">Rota:</FormLabel>
                <Select
                  isSearchable
                  name="colors"
                  options={routersList}
                  placeholder="Selecione uma rota"
                  value={selectedRoute}
                  onChange={setSelectedRoute}
                  focusBorderColor='primary.400'
                  selectedOptionStyle="check"
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <GridItem colSpan={1}>
                <CustomInputMask<FormInput>
                  name="departureTime"
                  control={control}
                  label="Horário de Ida:"
                  placeholder="Horário de Ida"
                  mask="99:99"
                />
              </GridItem>
            </GridItem>
            <GridItem colSpan={1}>
              <CustomInputMask<FormInput>
                name="backTime"
                control={control}
                label="Horário de Volta:"
                placeholder="Horário de Volta"
                mask="99:99"
              />
            </GridItem>
          </Grid>
          <Box position='relative' py='8'>
            <Divider />
            <AbsoluteCenter bg={bgColorDivider[colorMode]} px='4'>
              Dados de endereço
            </AbsoluteCenter>
          </Box>
          <Grid templateColumns={{ '2xl': 'repeat(6, 1fr)', xl: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)', }} gap={3}>
            <GridItem colSpan={{ xl: 1, sm: 3 }}>
              <FormControl id="cep">
                <FormLabel fontWeight="bold">CEP:</FormLabel>
                <Input
                  id="cep"
                  placeholder="CEP"
                  as={InputMask}
                  mask="99999-999"
                  maskChar={null}
                  type="text"
                  disabled={isLoading}
                  value={dataCEP}
                  onChange={(e) => {
                    setDataCEP(e.target.value);
                    setCEP(e.target.value);
                  }}
                  focusBorderColor='primary.400'
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl id="address">
                <FormLabel fontWeight="bold">Endereço:</FormLabel>
                <Input
                  id="address"
                  placeholder="Endereço"
                  type="text"
                  disabled={isLoading}
                  value={address}
                  onChange={(e) => { setAddress(e.target.value) }}
                  focusBorderColor='primary.400'
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl id="neighborhood">
                <FormLabel fontWeight="bold">Bairro:</FormLabel>
                <Input
                  id="neighborhood"
                  placeholder="Bairro"
                  type="text"
                  disabled={isLoading}
                  value={neighborhood}
                  onChange={(e) => {
                    setNeighborhood(e.target.value);
                  }}
                  focusBorderColor='primary.400'
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl id="number">
                <FormLabel fontWeight="bold">Número:</FormLabel>
                <Input
                  id="number"
                  placeholder="Número"
                  type="text"
                  disabled={isLoading}
                  value={number}
                  onChange={(e) => { setNumber(e.target.value) }}
                  focusBorderColor='primary.400'
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ xl: 2, sm: 3 }}>
              <FormControl id="complement">
                <FormLabel fontWeight="bold">Complemento:</FormLabel>
                <Input
                  id="complement"
                  placeholder="Complemento"
                  type="text"
                  disabled={isLoading}
                  value={complement}
                  onChange={(e) => { setComplement(e.target.value) }}
                  focusBorderColor='primary.400'
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ xl: 2, sm: 3 }}>
              <FormControl id="city">
                <FormLabel fontWeight="bold">Cidade:</FormLabel>
                <Input
                  id="city"
                  placeholder="Cidade"
                  type="text"
                  disabled={isLoading}
                  value={city}
                  onChange={(e) => { setCity(e.target.value) }}
                  focusBorderColor='primary.400'
                />
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ xl: 1, sm: 3 }}>
              <FormControl id="state">
                <FormLabel fontWeight="bold">Estado:</FormLabel>
                <Input
                  id="state"
                  placeholder="Estado"
                  type="text"
                  disabled={isLoading}
                  value={state}
                  onChange={(e) => { setState(e.target.value) }}
                  focusBorderColor='primary.400'
                />
              </FormControl>
            </GridItem>
          </Grid>
          <Divider my={6} />
          <Flex
            flexDirection="row"
            justifyContent="end"
            w="full"
            gap={2}
          >
            <Button
              size='md'
              onClick={() => router.push("/estudantes")}
              colorScheme="primary"
              variant='outline'
              w="48"
            >
              Voltar
            </Button>
            <Button
              type="submit"
              bg={"primary.400"}
              color={"white"}
              w="48"
              _hover={{
                bg: "orange.400",
              }}
            >
              Salvar
            </Button>
          </Flex>
        </form>
      </Container >
    </>
  );
};

const shiftList = [
  { value: 'Manhã', label: 'Manhã' },
  { value: 'Tarde', label: 'Tarde' },
  { value: 'Noite', label: 'Noite' }
];
const teachingList = [
  { value: 'Infantil', label: 'Infantil' },
  { value: 'Fundamental', label: 'Fundamental' },
  { value: 'Médio', label: 'Médio' },
  { value: 'Superior', label: 'Superior' }
];

const breadcrumbItens: Array<any> = [
  { name: "Inicio", link: "/" },
  { name: "Alunos", link: "/estudantes" },
  { name: "Cadastrar/Editar aluno", link: null }
];

const selectSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const FormValidation = z.object({
  name: z.string().min(4, {
    message: "O nome do aluno deve ter 4 caracteres ou mais.",
  }),
  teaching: selectSchema.required(),
  shift: selectSchema.required(),
  serie: z
    .string()
    .min(4, { message: "A senha de usuário deve ter 4 caracteres ou mais." }),

  schoolName: z
    .string()
    .min(4, { message: "A senha de usuário deve ter 4 caracteres ou mais." }),
  departureTime: z.string().min(4, { message: "O horário de ida deve ter 4 caracteres ou mais." }),
  backTime: z.string().min(4, { message: "O horário de volta deve ter 4 caracteres ou mais." }),
});

type FormInput = z.infer<typeof FormValidation>;
type SelectReason = z.infer<typeof selectSchema>;

interface PropsStudent {
  params: { id: string };
  routes: Array<any>;
  fetchRoutes: () => void;
  setCEP: (cep: string) => void;
  fetchAddressByCEP: (callback: Array<any>) => void;
  editStudent: ({ id, data }: { id: String; data: any }) => Promise<any>;
  createStudents: (data: any) => Promise<any>;
};

const defaultValues: FormInput = {
  name: "",
  serie: "",
  schoolName: "",
  teaching: { value: 'Infantil', label: 'Infantil' },
  shift: { value: 'Manhã', label: 'Manhã' },
  departureTime: "",
  backTime: "",
};

const mapStateToProps = (state: any) => {
  return {
    routes: (state.routes && state.routes.routes) || null,
  };
};
export default connect(mapStateToProps, {
  setCEP,
  fetchAddressByCEP,
  editStudent,
  createStudents
})(StudentPage);