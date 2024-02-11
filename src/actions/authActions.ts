"use server";
import { loginValidator, registerValidator } from "@/validations/authSchema";
import { errors } from "@vinejs/vine";
import { cookies } from "next/headers";
import { createActionClient } from "@/lib/supabase/actions";

import { redirect } from "next/navigation";

export async function registerAction(prevState: any, formdata: FormData) {
  const cookieStore = cookies();
  const supabase = createActionClient(cookieStore);
  try {
    const body = {
      name: formdata.get("name"),
      username: formdata.get("username"),
      email: formdata.get("email"),
      password: formdata.get("password"),
      password_confirmation: formdata.get("password_confirmation"),
    };

    const payload = await registerValidator.validate(body);
    // * Check if user name exist
    const { data: userData, error: findErr } = await supabase
      .from("users")
      .select("id")
      .eq("username", payload.username);
    console.log("The user data is", userData);
    console.log("The user find error", findErr);

    if (userData && userData.length > 0) {
      return {
        status: 400,
        errors: {
          username: "Username is already taken.please use another username",
        },
      };
    }

    // * Now signup the user
    const { error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          username: payload.username,
          name: payload.name,
        },
      },
    });

    // * Check if error exits
    if (error) {
      console.log("The error is", error);
      return { status: 400, errors: { email: error.message } };
    }

    await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return { status: 400, errors: error.messages };
    }
  }

  return redirect("/");
}

export async function loginAction(prevState: any, formdata: FormData) {
  try {
    const cookieStore = cookies();
    const supabase = createActionClient(cookieStore);
    const body = {
      email: formdata.get("email"),
      password: formdata.get("password"),
    };
    const payload = await loginValidator.validate(body);

    const { error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    if (error) {
      return { status: 400, errors: { email: error.message } };
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      console.log(error.messages);
      return { status: 400, errors: error.messages };
    }
  }

  return redirect("/");
}
