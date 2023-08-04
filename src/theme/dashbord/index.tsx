"use client"
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import LoadingComponent from "@/components/loading";
import { useRouter } from "next/navigation";
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Flex,
} from '@chakra-ui/react'
import { SidebarContent } from "./components/sidebar";
import { MobileNav } from "./components/mobile-nav";

function DashbordLayout({
  children,
  token,
  avatar
}: {
  children: React.ReactNode;
  token: any;
  avatar: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<Boolean>(true);
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    async function isAuthenticated(token: String) {
      if (token && token !== undefined) {
        setTimeout(() => setLoading(false), 2000)
      } else {
        router.push("/login");
      }
    }

    isAuthenticated(token);
  }, [])
  return (
    <>
      {loading ?
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <LoadingComponent loading={loading} color="#ff7a2d" />
        </Flex>
        : <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
          <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full">
            <DrawerContent>
              <SidebarContent onClose={onClose} />
            </DrawerContent>
          </Drawer>
          <MobileNav onOpen={onOpen} avatar={avatar} />
          <Box ml={{ base: 0, md: 60 }} p="4">
            {children}
          </Box>
        </Box>}
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    token: (state.singin.auth && state.singin.auth.accessToken) || null,
    avatar: (state.singin.auth && state.singin.auth.avatar) || null,
  };
};
export default connect(mapStateToProps, {})(DashbordLayout);
