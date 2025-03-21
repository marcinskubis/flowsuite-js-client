import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { URL } from "../config";

export default function SignUpForm() {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const navigate = useNavigate();

  async function registerUser(data) {
    try {
      const response = await fetch(`${URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          password: data.password,
        }),
        credentials: "include",
        mode: "cors",
      });

      if (response.ok) {
        reset();
        navigate("/sign-in");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        return;
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(registerUser)}
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
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters.",
            },
          }}
          name={"username"}
          label={"Username"}
          id={"username"}
          type={"text"}
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
        <Input
          errors={errors}
          register={register}
          registerContent={{
            required: "Password is required",
            minLength: {
              value: 3,
              message: "Password must be at least 3 characters",
            },
            validate: (val) => {
              if (watch("password") != val) {
                return "Your passwords do not match.";
              }
            },
          }}
          name={"passwordRpt"}
          label={"Repeat Password"}
          id={"passwordRpt"}
          type={"password"}
        />
        <Button style='submit' type='submit'>
          <p>Sign Up</p>
        </Button>
      </div>
    </form>
  );
}
