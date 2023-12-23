"use client"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
type TMyInputProps = {
    form : any
    label : string
    name : string
    placeholder? : string
}

export default function MyInput({form, name, label, placeholder =""}:TMyInputProps) {
  return (
    <div>
         <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input placeholder={placeholder||label} {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
    </div>
  )
}
