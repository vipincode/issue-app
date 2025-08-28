'use client';

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { routes } from '@/lib/routes';
import { useRouter } from 'next/navigation';
import { ForgotPassword, ForgotPasswordSchema } from '@/schemas/user.schema';

export function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm<ForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPassword) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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

        <Button type="submit" className="w-full" size="lg">
          Send reset link
        </Button>

        <div className="text-center">
          <Button variant="link" type="button" onClick={() => router.push(routes.login)}>
            Back to sign in
          </Button>
        </div>
      </form>
    </Form>
  );
}
