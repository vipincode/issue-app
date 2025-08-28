'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';
import { Input } from '@/components/ui/input';

export function ResetPasswordForm() {
  const router = useRouter();
  const form = useForm();

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Enter your new password below.</p>
        </div>

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
          name="Confirm password"
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

        <Button type="submit" className="w-full" size="lg">
          Reset password
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
