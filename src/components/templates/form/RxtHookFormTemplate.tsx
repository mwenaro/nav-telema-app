"use client";
import { zodResolver } from "@hookform/resolvers/zod"

import * as z from "zod"
 
const formSchema = z.object({
  name: z.string().min(6, {
    message: "Name must be at least 6 characters.",
  }),
})
 
import { Form, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MyInput } from "@/components";

export default function RxtHkFormTemplate({

  btnLabel = "Submit",
}: {

  btnLabel?: string;
}) {
  // ...
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
        },
      })

       // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    // onSubmit1(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <MyInput
          form={form}
          name="name"
          label="Name"
          placeholder="Enter Name"
        />

        <Button type="submit">{btnLabel}</Button>
      </form>
    </Form>
  );
}
