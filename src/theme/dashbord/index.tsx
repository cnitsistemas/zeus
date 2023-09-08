"use client"
import { connect, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoadingComponent from "@/components/loading";
import { useRouter } from "next/navigation";
import {
  useColorModeValue,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  Hide,
} from '@chakra-ui/react'
import { Sidebar } from "./components/sidebar";
import { MdMenu } from "react-icons/md";
import { handleSingOut } from "@/store/modules/singIn/singInActions";
import { SingInState } from "@/store/modules/singIn/singInReducers";
import { useAppDispatch } from "@/hooks/useRedux";
import { usePathname } from 'next/navigation'

function DashbordLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname()
  const [loading, setLoading] = useState<boolean>(true);
  const [collapse, setCollapse] = useState<boolean>(true);
  const bgFlex = useColorModeValue('gray.100', 'gray.800');
  const bgColorMain = { light: "white", dark: "#1A202C" };
  const backgroundBgColor = { light: "gray.100", dark: "#1A202C" };
  const { colorMode } = useColorMode();
  const singInState = useSelector(SingInState);
  const dispatch = useAppDispatch();
  const token = (singInState.auth && singInState.auth.accessToken) || null
  const avatar = (singInState.auth && singInState.auth.avatar) || null
  const name = singInState.auth && singInState.auth.name || null
  const email = singInState.auth && singInState.auth.email || null

  useEffect(() => {
    async function isAuthenticated(token: String) {
      if (token && token !== undefined) {
        setTimeout(() => setLoading(false), 2000)
      } else {
        router.push("/login");
      }
    }
    isAuthenticated(token);
  }, []);

  const handleLogoff = () => {
    dispatch(handleSingOut(token)).then(() => {
      router.push("/login")
    });
  }

  return (
    <>
      <main>
        {loading ?
          <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={bgFlex}>
            <LoadingComponent loading={loading} color="#ff7a2d" />
          </Flex>
          : <HStack w="full" h="100vh" bg={backgroundBgColor[colorMode]} padding={3} alignItems={"flex-start"} >
            <Hide below='lg'>
              <Flex
                as="aside"
                w="full"
                h="full"
                maxW={collapse ? 350 : 100}
                bg="#ff7a2d"
                alignItems="start"
                padding={6}
                flexDirection="column"
                justifyContent="space-between"
                transition="ease-in-out .2s"
                borderRadius="3xl"
              >

                <Sidebar
                  collapse={collapse}
                  avatar={avatar}
                  name={name}
                  email={email}
                  token={token}
                  handleSingOut={handleLogoff}
                  pathname={pathname}
                />
              </Flex>
            </Hide>
            <Flex
              as="main"
              w="full"
              h="full"
              bg={bgColorMain[colorMode]}
              flexDirection="row"
              position="relative"
              borderRadius="3xl"
              pt={10}
              px={6}
              overflow={"auto"}
            >
              <Hide below='lg'>
                <IconButton
                  aria-label="Menu Colapse"
                  icon={<MdMenu />}
                  position="absolute"
                  float={{ sm: "right" }}
                  top={6}
                  left={6}
                  onClick={() => setCollapse(!collapse)}
                />
              </Hide>
              {children}
            </Flex>
          </HStack>
        }
      </main>
    </>
  );
}
export default DashbordLayout;
