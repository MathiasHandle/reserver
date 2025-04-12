import { Event, EventCategoryWithEventCount } from '@/api/events/eventTypes'
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
import { useCreateEvent, useEditEvent } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { ControllerRenderProps } from 'react-hook-form'

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
  defaultValues?: Event
  onEditSuccess?: () => void
}

function EventForm(props: EventFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.defaultValues?.name ?? '',
      date: props.defaultValues?.date ?? '',
      categoryId: props.defaultValues?.eventCategory.id ?? props.eventCategories[0].id,
      description: props.defaultValues?.description ?? '',
      maxCapacity: props.defaultValues?.maxCapacity ?? 1,
    },
  })

  const isEditMode = !!props.defaultValues?.id

  const { mutate: createEvent } = useCreateEvent()
  const { mutate: editEvent } = useEditEvent()

  function onSubmitFn(values: FormSchema) {
    if (isEditMode) {
      if (!props.defaultValues?.id) return
      editEvent(
        { ...values, id: props.defaultValues.id },
        {
          onSuccess: () => {
            props.onEditSuccess?.()
          },
        }
      )
    } else {
      createEvent(values)
    }
  }

  const [date, setDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    if (props.defaultValues?.date) {
      setDate(new Date(props.defaultValues.date))
    }
  }, [props.defaultValues])

  function onDateChange(date: Date | undefined, onFieldChange: ControllerRenderProps['onChange']) {
    setDate(date)
    onFieldChange(date?.toISOString())
  }

  return (
    <Card className="w-full rounded-none sm:rounded-xl">
      <CardHeader>
        <h2 className="text-center text-lg font-bold">
          {isEditMode ? 'Edit event' : 'Create event'}
        </h2>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitFn)} className="flex flex-col gap-4">
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
                      <SelectTrigger>
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

                  {/* https://github.com/radix-ui/primitives/issues/2505 */}
                  <DateTimePicker
                    modal
                    value={date}
                    onChange={date => onDateChange(date, field.onChange)}
                    min={new Date()}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant={'action'} size={'lg'} className="mt-4 sm:self-center" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default EventForm
