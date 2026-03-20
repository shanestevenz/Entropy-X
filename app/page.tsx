import { PasswordGenerator } from "@/components/password-generator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
      <PasswordGenerator />
    </main>
  );
}
