'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';
import { Login, LoginSchema } from '@/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/app/(auth)/login/action';
import { toast } from 'sonner';

export function LoginForm() {
  const router = useRouter();
  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: Login) => {
    console.log(data, 'login data');
    try {
      const result = await login(data);
      if (result.success) {
        toast.success('Login successful');
        router.push(routes.issues.home);
        router.refresh();
      }

      return result;
    } catch (error) {
      toast.error((error as Error).message || 'An error occurred');
    }
  };

  return (
    <Form {...form}>
      <form autoComplete="off" className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <Button variant="link" type="button" onClick={() => router.push(routes.forgotPassword)}>
            Forgot your password?
          </Button>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Sign in
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">{"Don't have an account? "}</span>
          <Button variant="link" type="button" onClick={() => router.push(routes.register)}>
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
}
