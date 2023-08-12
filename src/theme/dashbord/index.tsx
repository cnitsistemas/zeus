"use client"
import { connect } from "react-redux";
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
import { handleSingOut } from "@/redux/singIn/singInActions";

interface PropsDashbord {
  children: React.ReactNode;
  token: any;
  avatar: string;
  name: string;
  email: string;
  handleSingOut: (token: string) => Promise<void>;
};

function DashbordLayout({
  children,
  token,
  avatar,
  name,
  email,
  handleSingOut
}: PropsDashbord) {
  const router = useRouter();
  const [loading, setLoading] = useState<Boolean>(true);
  const [collapse, setCollapse] = useState<Boolean>(true);
  const bgColorMain = { light: "white", dark: "#1A202C" };
  const backgroundBgColor = { light: "gray.100", dark: "#1A202C" };
  const { colorMode } = useColorMode();

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

  return (
    <>
      <main>
        {loading ?
          <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.100', 'gray.800')}>
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
                  handleSingOut={handleSingOut}
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

const mapStateToProps = (state: any) => {
  return {
    token: (state.singin.auth && state.singin.auth.accessToken) || null,
    avatar: (state.singin.auth && state.singin.auth.avatar) || null,
    name: state.singin.auth && state.singin.auth.name || null,
    email: state.singin.auth && state.singin.auth.email || null,
  };
};
export default connect(mapStateToProps, {
  handleSingOut
})(DashbordLayout);
