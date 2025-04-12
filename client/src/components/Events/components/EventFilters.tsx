import { EventCategory } from '@/api/events/eventTypes'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import useGetEventCategories from '@/hooks/api/events/useGetEventCategories'
import { EventsPageSearchParams } from '@/routes/events'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from '@tanstack/react-router'
import { useCallback, useMemo } from 'react'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  categoryId: z.number().int('Category ID must be an integer'),
  sort: z.enum(['asc', 'desc']),
})

type FormSchema = z.infer<typeof formSchema>

type CategoryId = EventCategory['id'] | -1
type CategoryName = EventCategory['name'] | 'all'
type CategoryWithAllFilter = {
  id: CategoryId
  name: CategoryName
}

type EventFiltersProps = {
  searchParams: EventsPageSearchParams
  updateFilters: (filters: FormSchema) => void
}

function EventFilters(props: EventFiltersProps) {
  const router = useRouter()

  const { data: categories, isFetching } = useGetEventCategories()

  const categoriesWithAll: CategoryWithAllFilter[] = useMemo(
    () => (categories ? [{ id: -1, name: 'all' }, ...categories] : []),
    [categories]
  )

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: props.searchParams.categoryId ?? -1,
      sort: props.searchParams.sort ?? 'desc',
    },
  })

  const onChangeCategory = useCallback(
    (value: string, fieldOnChangeCb: ControllerRenderProps['onChange']) => {
      fieldOnChangeCb(Number(value))

      // Write query params to url
      router.navigate({
        to: '/events',
        search: {
          categoryId: value === '-1' ? undefined : Number(value),
          sort: props.searchParams.sort,
        },
      })

      props.updateFilters({
        categoryId: Number(value),
        sort: props.searchParams.sort,
      })
    },
    [props, router]
  )

  const onChangeSort = useCallback(
    (value: FormSchema['sort'], fieldOnChangeCb: ControllerRenderProps['onChange']) => {
      fieldOnChangeCb(value)

      // Write query params to url
      router.navigate({
        to: '/events',
        search: {
          categoryId: props.searchParams.categoryId,
          sort: value,
        },
      })

      props.updateFilters({
        categoryId: props.searchParams.categoryId ?? -1,
        sort: value,
      })
    },
    [props, router]
  )

  return (
    <section className="flex flex-col gap-6 sm:flex-row">
      {isFetching && !categories?.length && (
        <>
          {Array.from({ length: 2 }).map((_item, index) => (
            <div key={index}>
              <Skeleton className="bg-card mb-2 h-4 w-28" />
              <Skeleton className="bg-card h-8 w-48" />
            </div>
          ))}
        </>
      )}

      {categories?.length && (
        <Form {...form}>
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={value => onChangeCategory(value, field.onChange)}
                  defaultValue={field.value.toString()}
                >
                  <FormLabel>Event category</FormLabel>

                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {categoriesWithAll.map(category => (
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
            name="sort"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value: FormSchema['sort']) => onChangeSort(value, field.onChange)}
                  defaultValue={field.value.toString()}
                >
                  <FormLabel>Sort by participants count</FormLabel>

                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="asc">ASC</SelectItem>
                    <SelectItem value="desc">DESC</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      )}
    </section>
  )
}

export default EventFilters
