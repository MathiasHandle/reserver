import { useLogInUser } from '@/hooks'
import { ApiError } from '@/services/fetch/apiTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { InputLabel } from '../Form'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const getMinMsg = (field: string, min: number) => `${field} must contain at least ${min} characters`
const getMaxMsg = (field: string) => `${field} is too long`

const formSchema = z.object({
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
})

type FormSchema = z.infer<typeof formSchema>

type LoginFormProps = {
  onSuccess?: () => void
}

function LoginForm(props: LoginFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate: loginUser } = useLogInUser()

  async function onSubmitFn(values: FormSchema) {
    loginUser(values, {
      onError: err => {
        // Set errors from response
        if (err instanceof ApiError) {
          // Access the shape of the Zod schema to get the keys
          const schemaShape = formSchema.shape

          Object.keys(schemaShape).forEach(key => {
            form.setError(key as keyof FormSchema, { message: err.detail.message })
          })
        }
      },
      onSuccess: () => {
        props.onSuccess?.()
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitFn)} className="flex flex-col gap-6">
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

        <Button type="submit" variant={'action'} className="mt-4">
          Log in
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm
