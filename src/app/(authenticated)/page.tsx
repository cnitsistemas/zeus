"use client";
import { useAppDispatch } from "@/hooks/useRedux";
import { getAccessTokenConecta } from "@/store/modules/address/addressActions";
import { Container, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function HomeComponent() {
  const [loading, setLoading] = useState<Boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAccessTokenConecta());
  }, [dispatch]);
  return (
    <Container maxW="container.2xl" px={{ xl: 20, sm: 0 }}>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Dashboard
      </Text>
    </Container>
  );
}

export default HomeComponent;
