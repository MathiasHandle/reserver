import { EventCategoryWithEventCount } from '@/api/events/eventTypes'
import { InputLabel } from '@/components/Form'
import { Button } from '@/components/ui/button'
import { DateTimePicker } from '@/components/ui/datetime-picker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCreateEvent } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long').max(100, 'Name is too long'),
  date: z.string().datetime('Invalid date format'),
  categoryId: z.number().int('Category ID must be an integer'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters long')
    .max(1000, 'Description is too long'),
  maxCapacity: z.number().int('Capacity must be an integer').min(1, 'Capacity must be at least 1'),
})

type FormSchema = z.infer<typeof formSchema>

type EventFormProps = {
  eventCategories: EventCategoryWithEventCount[]
}

function EventForm(props: EventFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // TODO pass props for PUT request
    defaultValues: {
      name: '',
      date: '',
      categoryId: props.eventCategories[0].id,
      description: '',
      maxCapacity: 1,
    },
  })

  const { mutate: createEvent } = useCreateEvent()

  function onSubmitFn(values: FormSchema) {
    console.log('submit: ', values)

    createEvent(values)
  }

  const [date, setDate] = useState<Date | undefined>(undefined)

  function onDateChange(date: Date | undefined, onFieldChange: (...event: any[]) => void) {
    setDate(date)
    onFieldChange(date?.toISOString())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitFn)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <InputLabel text="Event name" />
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <InputLabel text="Event description" />
              <FormControl>
                <Textarea {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={value => field.onChange(Number(value))}
                defaultValue={field.value.toString()}
              >
                <FormLabel>Event category</FormLabel>

                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {props.eventCategories.map(category => (
                    <SelectItem value={category.id.toString()} key={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxCapacity"
          render={({ field }) => (
            <FormItem>
              <InputLabel text="Max capacity" />
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <InputLabel text="Event date" />

              <DateTimePicker
                value={date}
                onChange={date => onDateChange(date, field.onChange)}
                min={new Date()}
              />

              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={'action'} size={'lg'} className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  )
}

export default EventForm
