import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const CredentialsSignInForm = () => {
  return (
    <form>
      <div className="space-y-6">
        <div>
          <label htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            // defaultValue={signInDefaultValues.email}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password">
            Password
          </label>
          <Input
            type="password"
            id="password"
            name="password"
            required
            // defaultValue={signInDefaultValues.password}
            autoComplete="current-password"
          />
        </div>
        <div>
          <Button className="w-full" variant='default'>
            Sign In with credentials
          </Button>
        </div>

        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link target='_self' className="link" href="/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
