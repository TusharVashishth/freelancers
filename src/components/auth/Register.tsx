"use client";
import React from "react";
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
import { registerAction } from "@/actions/authActions";
import { useFormState } from "react-dom";
import { SubmitBtn } from "./SubmitBtn";

const initState = {
  status: 0,
  errors: {},
};

export default function Register() {
  const [state, formAction] = useFormState(registerAction, initState);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Create new account a join new era of chatting .
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form action={formAction}>
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name."
              />
              <span className="text-red-400">{state?.errors?.name}</span>
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username."
              />
              <span className="text-red-400">{state?.errors?.username}</span>
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email."
              />
              <span className="text-red-400">{state?.errors?.email}</span>
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password."
              />
              <span className="text-red-400">{state?.errors?.password}</span>
            </div>
            <div className="space-y-1">
              <Label htmlFor="cpassword">Confirm Password</Label>
              <Input
                id="cpassword"
                type="password"
                name="password_confirmation"
                placeholder="Confirm your password."
              />
            </div>
            <div className="mt-2">
              <SubmitBtn text="Submit" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
