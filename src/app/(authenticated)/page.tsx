"use client";
import { Container, Text } from "@chakra-ui/react";
import { useState } from "react";

function HomeComponent() {
  const [loading, setLoading] = useState<Boolean>(true);

  return (
    <Container maxW='container.2xl' px={{ xl: 20, sm: 0 }}>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Dashboard
      </Text>
    </Container>
  );
}

export default HomeComponent;