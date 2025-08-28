'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';
import { User, UserSchema } from '@/schemas/user.schema';
import { register } from '@/app/(auth)/register/action';
import { toast } from 'sonner';

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<User>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: User) => {
    try {
      const result = await register(data);

      // Handle successful submission
      if (result.success) {
        toast.success('Account created successfully');
        router.push(routes.issues.home);
        console.log('Register result:', result);
      }

      return result;
    } catch (err) {
      toast.error((err as Error).message || 'An error occurred');
    }
  };

  return (
    <Form {...form}>
      <form autoComplete="off" className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

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
                <Input placeholder="••••••••" {...field} type="password" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" {...field} type="password" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" size="lg">
          Create account
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Already have an account? </span>
          <Button variant="link" type="button" onClick={() => router.push(routes.login)}>
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
}
