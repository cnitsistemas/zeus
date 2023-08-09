"use client";
import { Button, Container, Divider, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, GridItem, Heading, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ControlledSelect from "@/components/select";
import { connect } from "react-redux";
import CustomInputMask from "@/components/input-mask";

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
    .min(4, { message: "A senha de usuário deve ter 4 caracteres ou mais" }),

  schoolName: z
    .string()
    .min(4, { message: "A senha de usuário deve ter 4 caracteres ou mais" }),
  selectedRoute: selectSchema.required(),
  departureTime: z.string().min(4, { message: "O horário de ida deve ter 4 caracteres ou mais" }),
  backTime: z.string().min(4, { message: "O horário de volta deve ter 4 caracteres ou mais" }),
  cep: z.string(),
  address: z.string().min(4, { message: "O endereço deve ter 4 caracteres ou mais" }),
  neighborhood: z.string().min(4, { message: "O bairro deve ter 4 caracteres ou mais" }),
});

type FormInput = z.infer<typeof FormValidation>;
type SelectReason = z.infer<typeof selectSchema>;

interface PropsStudent {
  params: { id: string };
  routes: Array<any>;
  fetchRoutes: () => void;
};

function StudentPage({ params, routes, fetchRoutes }: PropsStudent) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(FormValidation),
    defaultValues: {
      name: "",
      serie: "",
      schoolName: "",
    },
  });
  const { id } = params;
  const [studentId, setStudentId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [serie, setSerie] = useState<string>("");
  const [teaching, setTeaching] = useState<any>("");
  const [shift, setShift] = useState<string>("");
  const [schoolName, setSchoolName] = useState<string>("");
  const [departureTime, setDepartureTime] = useState<string>("");
  const [backTime, setBackTime] = useState<string>("");
  const [routersList, setRoutersList] = useState<Array<any>>([]);
  const [selectedRoute, setSelectedRoute] = useState<string>("");
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

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    setIsLoading(true);

  };

  return (
    <>
      <Container maxW='container.2xl' px={{ xl: 20, sm: 0 }}>

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
        <form onSubmit={handleSubmit(onSubmit)} >
          <Grid templateColumns={{ '2xl': 'repeat(6, 1fr)', xl: 'repeat(3, 1fr)', sm: 'repeat(1, 1fr)', }} gap={3}>
            <GridItem colSpan={2}>
              <FormControl id="name" isInvalid={!!errors.name}>
                <FormLabel fontWeight="bold">Nome</FormLabel>
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
            <GridItem colSpan={2}>
              <FormControl id="schoolName" isInvalid={!!errors.schoolName}>
                <FormLabel fontWeight="bold">Nome da Escola</FormLabel>
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
            <GridItem colSpan={2}>
              <FormControl id="serie" isInvalid={!!errors.serie}>
                <FormLabel fontWeight="bold">Série</FormLabel>
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
                label="Ensino"
                placeholder="Ensino"
                options={teachingList}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <ControlledSelect<FormInput, SelectReason, true>
                name="shift"
                control={control}
                label="Turno"
                placeholder="Turno"
                options={shiftList}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <ControlledSelect<FormInput, SelectReason, true>
                isSearchable
                name="selectedRoute"
                control={control}
                label="Rota"
                placeholder="Rota"
                options={routersList}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <GridItem colSpan={1}>
                <CustomInputMask<FormInput>
                  name="departureTime"
                  control={control}
                  label="Horário de Ida"
                  placeholder="Horário de Ida"
                  mask="99:99"
                />
              </GridItem>
            </GridItem>
            <GridItem colSpan={1}>
              <CustomInputMask<FormInput>
                name="backTime"
                control={control}
                label="Horário de Volta"
                placeholder="Horário de Volta"
                mask="99:99"
              />
            </GridItem>
          </Grid>
          <Divider my={6} />
          <Grid templateColumns={{ '2xl': 'repeat(6, 1fr)', xl: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)', }} gap={3}>
            <GridItem colSpan={1}>
              <CustomInputMask<FormInput>
                name="cep"
                control={control}
                label="CEP"
                placeholder="CEP"
                mask="99999-999"
              />
            </GridItem>
            <GridItem colSpan={3}>
              <FormControl id="address" isInvalid={!!errors.address}>
                <FormLabel fontWeight="bold">Endereço</FormLabel>
                <Input
                  id="address"
                  placeholder="Endereço"
                  type="text"
                  disabled={isLoading}
                  {...register("address")}
                  focusBorderColor='primary.400'
                />
                <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl id="neighborhood" isInvalid={!!errors.neighborhood}>
                <FormLabel fontWeight="bold">Bairro</FormLabel>
                <Input
                  id="neighborhood"
                  placeholder="Bairro"
                  type="text"
                  disabled={isLoading}
                  {...register("neighborhood")}
                  focusBorderColor='primary.400'
                />
                <FormErrorMessage>{errors.neighborhood?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>
          <Divider my={6} />
          <Button
            type="submit"
            bg={"primary.400"}
            color={"white"}
            _hover={{
              bg: "orange.400",
            }}
          >
            Salvar
          </Button>
        </form>
      </Container >
    </>
  );

}

const mapStateToProps = (state: any) => {
  return {
    routes: (state.routes && state.routes.routes) || null,
  };
};
export default connect(mapStateToProps, {
})(StudentPage);