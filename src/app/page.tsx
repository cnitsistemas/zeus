"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import Dashbord from "../theme/dashbord";
import { Avatar } from "@/components/ui/avatar";
import SingIn from "@/pages/singIn/singIn";
import { useEffect, useState } from "react";
// import { signIn, signOut, useSession } from "next-auth/react";
import Loading from "@/components/loading";
import { connect } from "react-redux";

function Home(props: any) {
  const { accessToken } = props;
  const { setTheme } = useTheme();
  // const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen bg-slate-50 items-center justify-center">
        <Loading loading={loading} color="#ff7a2d" />
      </main>
    );
  } else if (accessToken) {
    console.log(accessToken);
    return (
      <>
        <Dashbord />
      </>
    );
  }
  return (
    <>
      <main className="flex min-h-screen bg-slate-50 items-center justify-center">
        <SingIn setLoading={setLoading} />
      </main>
    </>
  );
}
const mapStateToProps = (state: any) => {
  return {
    accessToken: (state.singin.auth && state.singin.auth.accessToken) || null,
  };
};
export default connect(mapStateToProps, {})(Home);
