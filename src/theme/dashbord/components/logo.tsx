import { Box, Flex, Text } from "@chakra-ui/react";
import SimpleLogo from "@/assets/simple-logo.png";
import Image from "next/image";

export const Logo = ({ collapse }: { collapse: Boolean }) => {

  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="space-between"
      flexDirection={collapse ? "row" : "column"}
      gap={4}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Image src={SimpleLogo} width={40} alt="Picture of the author" />
        {collapse && (
          <Text fontWeight="bold" fontSize={20} color={"white"}>
            Sistema de Gestão CNIT
          </Text>
        )}
      </Box>
    </Flex>
  )
};
