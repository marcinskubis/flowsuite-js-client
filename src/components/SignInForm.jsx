import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import Button from "./Button";
import { useGoogleLogin } from "@react-oauth/google";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { URL } from "../config";

export default function SignInForm() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const navigate = useNavigate();

  const { setUserId } = useUserStore();

  async function handleAuthenticationSuccess({ code }) {
    try {
      const response = await fetch(`${URL}/api/auth/google-login`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }

      const responseData = await response.json();

      reset();
      await setUserId(responseData.userId);

      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  }

  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => handleAuthenticationSuccess(credentialResponse),
    onError: (error) => console.error("Login Failed:", error),
    flow: "auth-code",
  });

  const submitForm = async (data) => {
    try {
      const response = await fetch(`${URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        credentials: "include",
        mode: "cors",
      });

      const responseData = await response.json();

      if (response.ok) {
        reset();
        await setUserId(responseData.userId);
        navigate("/profile");
      }

      if (responseData.message !== "Authorized") {
        return;
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className='bg-white rounded-md flex flex-col gap-10 p-10 shadow-md w-full max-w-96'
    >
      <div className='flex flex-col gap-8'>
        <Input
          errors={errors}
          register={register}
          registerContent={{
            required: "Email is required",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
              message: "Invalid email address",
            },
          }}
          name={"email"}
          label={"Email"}
          id={"email"}
          type={"email"}
        />
        <Input
          errors={errors}
          register={register}
          registerContent={{
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password must be at least 3 characters",
            },
          }}
          name={"password"}
          label={"Password"}
          id={"password"}
          type={"password"}
        />
        <Button style='submit' type='submit'>
          Log In
        </Button>
      </div>

      <div className='w-full h-[.5px] bg-timberwolf'></div>

      <Button
        style='default'
        type='button'
        onClick={() => {
          login();
        }}
      >
        <div className='flex items-center gap-4 justify-center'>
          <p>Sign in with Google</p> <FaGoogle size={24} />
        </div>
      </Button>
    </form>
  );
}
