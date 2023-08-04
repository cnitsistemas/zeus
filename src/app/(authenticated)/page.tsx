"use client";
import { Text } from "@chakra-ui/react";
import { Metadata } from "next";
import { useState } from "react";
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

  return (
    <main>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Dashboard
      </Text>
    </main>
  );
}

const mapStateToProps = (state: any) => {
  return {
    token: (state.singin.auth && state.singin.auth.accessToken) || null,
  };
};
export default connect(mapStateToProps, {})(HomeComponent);