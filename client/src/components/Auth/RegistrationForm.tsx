import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { InputLabel } from '../Form'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const getMinMsg = (field: string, min: number) => `${field} must contain at least ${min} characters`
const getMaxMsg = (field: string) => `${field} is too long`

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: getMinMsg('Name', 2),
      })
      .max(50, {
        message: getMaxMsg('Name'),
      }),
    surname: z
      .string()
      .min(2, {
        message: getMinMsg('Surname', 2),
      })
      .max(50, {
        message: getMaxMsg('Surname'),
      }),
    email: z
      .string()
      .min(2, {
        message: getMinMsg('E-mail', 2),
      })
      .max(50, {
        message: 'E-mail is too long',
      })
      .email('E-mail has invalid format'),
    password: z
      .string()
      .min(2, {
        message: getMinMsg('Password', 2),
      })
      .max(50, {
        message: getMaxMsg('Password'),
      }),
    reapeatPassword: z
      .string()
      .min(2, {
        message: getMinMsg('Repeat password', 2),
      })
      .max(50, {
        message: getMaxMsg('Repeat password field'),
      }),
  })
  .refine(values => values.password === values.reapeatPassword, {
    message: "Passwords don't match",
    path: ['reapeatPassword'],
  })

function RegistrationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      reapeatPassword: '',
    },
  })

  function onSubmitFn(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitFn)} className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <InputLabel text="Name" />
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <InputLabel text="Surname" />
              <FormControl>
                <Input {...field} />
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
              <InputLabel text="E-mail" />
              <FormControl>
                <Input {...field} />
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
              <InputLabel text="Password" />
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reapeatPassword"
          render={({ field }) => (
            <FormItem>
              <InputLabel text="Repeat password" />
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant={'action'} className="mt-4">
          Register
        </Button>
      </form>
    </Form>
  )
}

export default RegistrationForm
