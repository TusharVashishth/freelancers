"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useFormState } from "react-dom";
import { loginAction } from "@/actions/authActions";
import { SubmitBtn } from "./SubmitBtn";

const initState = {
  status: 0,
  errors: {},
};

export default function Login() {
  const params = useSearchParams();
  useEffect(() => {
    if (params.get("error")) {
      toast.warning(params.get("error"), { theme: "colored" });
    }
  }, []);

  const [state, formAction] = useFormState(loginAction, initState);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Welcome back to new era of coding.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form action={formAction}>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="Enter your email." />
              <span className="text-red-400">{state?.errors?.email}</span>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
              />
              <span className="text-red-400">{state?.errors?.password}</span>
            </div>
            <div className="mt-3">
              <SubmitBtn text="Submit" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
