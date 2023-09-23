"use client";

import { ChatInputValidation } from "@/lib/form-validation/Validation";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import EmojiPicker from "@/components/shares/emoji-picker";

interface ChatInputProps {
  apiUrl?: string;
  query?: Record<string, any>;
  name: string;
  type: "conversation" | "channels";
}

const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const form = useForm<z.infer<typeof ChatInputValidation>>({
    resolver: zodResolver(ChatInputValidation),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async() => {};

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative pb-6 p-4">
                  <button
                    //TO DO Onclick
                    onClick={() => {}}
                    type="button"
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>
                  <Input
                    disabled={isLoading}
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder="Chat here"
                    {...field}
                  />

                  {/* check form  */}

                  {/* <div className="absolute top-7 right-8">
                    <EmojiPicker 
                    onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)}
                    />
                  </div> */}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;
