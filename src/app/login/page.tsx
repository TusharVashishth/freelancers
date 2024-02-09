import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../(front)/loading";

export const metadata: Metadata = {
  title: "Login|Freelancers",
  description: "Please login to access the Community app for freelancers.",
};

export default function login() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <div className="flex flex-col justify-center items-center mb-4">
        <Image src="/images/logo_512.png" width={100} height={100} alt="logo" />
        <p className="font-bold text-xl">Freelancers</p>
        <p>A community of freelancers</p>
      </div>

      <Tabs defaultValue="login" className="w-full md:w-[500px] px-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        </TabsContent>
        <TabsContent value="register">
          <Register />
        </TabsContent>
      </Tabs>
    </div>
  );
}
