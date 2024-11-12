import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { RegisterForm } from "./components/register-form";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center font-geist-mono text-base text-text">
      <section className="mb-32 mt-20 flex w-[70%] flex-col justify-between md:mt-0 md:flex-row">
        {/* Register section */}
        <section className="flex flex-col gap-2">
          <h1>Register</h1>
          <RegisterForm />
        </section>

        {/* Login section */}
        <section className="mt-10 flex flex-col gap-2 md:mt-0">
          <h1>Login</h1>
          <form className="flex flex-col gap-2" action="">
            <Input placeholder="email" type="email" name="email" />
            <Input placeholder="password" type="password" name="password" />
            <Button>Login</Button>
          </form>
        </section>
      </section>
    </div>
  );
}
