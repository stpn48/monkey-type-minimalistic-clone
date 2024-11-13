import { LoginForm } from "./components/login-form";
import { RegisterForm } from "./components/register-form";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center font-geist-mono text-base text-text">
      <section className="mb-[110px] mt-20 flex w-[80%] flex-col justify-between gap-10 lg:mt-0 lg:flex-row">
        {/* Register section */}
        <section className="flex flex-col gap-2">
          <h1>Register</h1>
          <RegisterForm />
        </section>

        {/* Login section */}
        <section className="mt-10 flex flex-col gap-2 md:mt-0">
          <h1>Login</h1>
          <LoginForm />
        </section>
      </section>
    </div>
  );
}
