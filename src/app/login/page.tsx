import { Input } from "@/components/input";

export default function LoginPage() {
  return (
    <div className="font-geist-mono text-base text-text">
      {/* Register section */}
      <section className="flex w-[80%] justify-between">
        <section className="flex flex-col gap-2">
          <h1>Register</h1>
          <form className="flex flex-col gap-2" action="">
            <Input placeholder="email" />
            <Input placeholder="username" />
            <Input placeholder="password" />
            <Input placeholder="confirm password" />
          </form>
        </section>

        {/* Login section */}
        <section>
          <h1>Login</h1>
          <form className="flex flex-col gap-2" action="">
            <Input placeholder="email" />
            <Input placeholder="username" />
          </form>
        </section>
      </section>
    </div>
  );
}
