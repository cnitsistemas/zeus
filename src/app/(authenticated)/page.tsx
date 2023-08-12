"use client";
import { Container, Text } from "@chakra-ui/react";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
export const metadata: Metadata = {
  title: "CNIT - Home",
  description:
    "App da empresa CNIT focado em gerencia de transporte de alunos.",
};

interface Props {
  token: String;
}

function HomeComponent(props: Props) {
  const { token } = props;
  const [loading, setLoading] = useState<Boolean>(true);
  useEffect(() => {
    const sessionRoot = JSON.parse(window.localStorage.getItem('persist:root') || '{}')

    console.log(sessionRoot)
  }, []);
  return (
    <main>
      <Container maxW='container.2xl' px={{ xl: 20, sm: 0 }}>
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Dashboard
        </Text>
      </Container>
    </main>
  );
}

const mapStateToProps = (state: any) => {
  return {
    token: (state.singin.auth && state.singin.auth.accessToken) || null,
  };
};
export default connect(mapStateToProps, {})(HomeComponent);