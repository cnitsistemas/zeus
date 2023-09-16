"use client";
import InputSelectChip from "@/components/_forms/Inputs/InputSelectChip";
import {
  Button,
  DialogActions,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";

interface Props {
  allRoles: Array<any>;
  selectRoles: any;
  handleClose: () => void;
  handleApplyRoleToUser: (role: any) => void;
}

type FormValues = {
  roles: Array<any>;
};
const defaultValues = {
  roles: [],
};

const AssignmentRoles = ({
  allRoles,
  selectRoles,
  handleClose,
  handleApplyRoleToUser,
}: Props) => {
  const [initialValues, setInitialValues] = useState<any>(defaultValues);
  useEffect(() => {
    if (selectRoles && selectRoles.length > 0) {
      const roles = selectRoles.map((role: any) => role.name);
      setInitialValues({
        roles: roles,
      });
    }
  }, []);
  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{ display: "flex", flexDirection: "row" }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            component={"h1"}
            sx={{ fontSize: "13px", color: "#666666" }}
            gutterBottom
          >
            Atribua ou remova papéis ao usuário selecionado. Basta selecionar o
            papel que deseja atribuir e aplicar a requisição. Caso não encontre
            o papel desejado vá até a tela de papéis para adicionar um novo.
          </Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            onSubmit={(values: FormValues, { setSubmitting }) => {
              handleApplyRoleToUser(values);
            }}
          >
            <Form>
              <InputSelectChip
                label="Papeis"
                id="roles"
                name="roles"
                data={allRoles}
              />
              <Divider sx={{ mt: 3 }} />

              <DialogActions>
                <Button variant="outlined" onClick={handleClose}>
                  Fechar
                </Button>
                <Button variant="contained" color="success" type="submit">
                  Salvar Papeis do usuário
                </Button>
              </DialogActions>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default AssignmentRoles;
