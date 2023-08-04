"use client"
import TeamSwitcher from "./components/team-switcher";
import { MainNav } from "./components/main-nav";
import { Search } from "./components/search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import UserNav from "./components/user-nav";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import LoadingComponent from "@/components/loading";
import { useRouter } from "next/navigation";

function DashbordLayout({
  children,
  token
}: {
  children: React.ReactNode;
  token: any;
}) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const [loading, setLoading] = useState<Boolean>(true);

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
        <main className="flex min-h-screen bg-slate-50 items-center justify-center">
          <LoadingComponent loading={loading} color="#ff7a2d" />
        </main>
        : <main className="flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
              <TeamSwitcher />
              <MainNav className="mx-6" />
              <div className="ml-auto flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Search />
                <UserNav />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
        </main>}
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    token: (state.singin.auth && state.singin.auth.accessToken) || null,
  };
};
export default connect(mapStateToProps, {})(DashbordLayout);
