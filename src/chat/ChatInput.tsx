import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formSchema, type GuideForm } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleFadingArrowUp } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  onSubmit: (data: GuideForm) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
  const form = useForm<GuideForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const { register, handleSubmit, reset, formState } = form;

  const submit = handleSubmit((data) => {
    reset({ prompt: "" });
    onSubmit(data);
  });

  const handleKeyDown = (e: {
    key: string;
    shiftKey: unknown;
    preventDefault: () => void;
  }) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={submit}
        onKeyDown={handleKeyDown}
        className="relative w-full "
      >
        <Textarea
          {...register("prompt")}
          autoFocus
          placeholder="Ask anything"
          className="w-full pr-12 border-0 focus:outline-none resize-none rounded-2xl"
          rows={1}
        />

        <Button
          type="submit"
          disabled={!formState.isValid}
          className="absolute bottom-2 right-2 rounded-full w-9 h-9 p-0 flex items-center justify-center"
        >
          <CircleFadingArrowUp className="w-5 h-5" />
        </Button>
      </form>
    </FormProvider>
  );
};

export default ChatInput;
