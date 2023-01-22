import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";
import { UserCredential } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../context/Auth";
import { GoogleIcon } from "../Common/GoogleIcon";
import { api } from "../../../utils/api";
export default function LoginBody() {
  const auth = useAuth();
  const router = useRouter();
  const { mutateAsync: createUser } = api.user.createUser.useMutation();
  const { mutate: googleLogin, isLoading: googleLoginLoading } = useMutation(
    async () => {
      const user = await auth.googleLogin({
        popup: true,
      });

      if (user.user) {
        await createUser({
          id: user.user.uid,
          email: user.user.email || "",
          name: user.user.displayName || "",
        });
      } else {
        throw new Error("No user found");
      }

      return user;
    },
    {
      // rome-ignore lint/suspicious/noExplicitAny: <explanation>
      onError: (err: any) => {
        showNotification({
          title: "Error",
          message: (err as FirebaseError).message,
          color: "red",
        });
      },
      onSuccess: () => {
        router.push("/dashboard");
      },
    },
  );
  return (
    <div className="h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="/logo.svg"
            alt="Habit Pilot"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Habit Pilot
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* continue with google */}
            <Button
              fullWidth
              onClick={() => googleLogin()}
              leftIcon={<GoogleIcon />}
              variant="default"
              size="md"
              color="gray"
              loading={googleLoginLoading}
            >
              Continue with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
