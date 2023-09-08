"use client"
import { FormControl, FormLabel, Grid, Text } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React from "react";

interface Props {
  allRoles: any;
  selectRoles: any;
  setSelectRoles: (roles: any) => void;
}

const AssignmentRoles = ({ allRoles, selectRoles, setSelectRoles }: Props) => {
  return (
    <>
      <Grid sx={{ display: 'flex', flexDirection: 'column' }}>
        <Grid>
          <Text color="gray.600" my={4} mx={2}>
            Atribua ou remova papéis ao usuário selecionado. Basta selecionar o papel que deseja atribuir e
            aplicar a requisição. Caso não encontre o papel desejado vá até a tela de papéis para adicionar um novo.
          </Text>
        </Grid>
        <Grid>
          <FormControl id="roles">
            <FormLabel fontWeight="bold">Papeis</FormLabel>
            <Select
              isMulti
              name="colors"
              options={allRoles}
              placeholder="Selecione uma rota"
              value={selectRoles}
              onChange={setSelectRoles}
              focusBorderColor='primary.400'
              selectedOptionStyle="check"
            />
          </FormControl>
        </Grid>
      </Grid>

    </>
  )
}

export default AssignmentRoles;