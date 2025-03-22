import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo";
import { useMutation } from "@tanstack/react-query";
import { registerUserMutationFn } from "../../apis/auth.apis"
import { toast } from "@/hooks/useToast";
import { Loader } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: registerUserMutationFn,
  });
  const formSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().email("Invalid email address"),
    password: z.string().trim().min(7, "Password must be at least 7 charactes long"),
    confirmPassword: z.string().trim().min(7, "Confirm Password must be at least 7 charactes long"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This will attach the error to the confirmPassword field
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      name: "", 
      email: "", 
      password: "", 
      confirmPassword:"" 
    },
  });

  const onSubmit = values => {
    delete values.confirmPassword
    console.log("Signup form values: ", values)
    if (isPending) return;
    mutate(values, {
      onSuccess: () => {
        toast({
          title: "Account Created Successfully",
          description: "Signup successful",
          variant: "success",
        });
        form.reset()
        navigate("/login")
      },
      onError: (error) => {
        console.log(error.response);
        toast({
          title: "Signup Failed",
          description: error.response.data.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link to="/" className="flex items-center gap-2 self-center font-medium text-2xl">
          <Logo /> StudySphere
        </Link>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Create an account</CardTitle>
              <CardDescription>
                Register with your Email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-1">
                    <div className="relative text-center text-sm after:absolute after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    </div>
                    <div className="grid gap-2">
                      <div className="grid gap-2">
                        <FormField control = { form.control } name = "name" render = {({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Joh Doe" className="!h-[40px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <div className="grid gap-2">
                        <FormField control = { form.control } name="email" render = {({ field }) => (
                            <FormItem>
                              <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="m@example.com" className="!h-[40px]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )} />
                      </div>
                      <div className="grid gap-2">
                        <FormField control={form.control} name="password" render = {({ field }) => (
                            <FormItem>
                              <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                Password
                              </FormLabel>
                              <FormControl>
                                <Input type="password" className="!h-[40px]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )} />
                      </div>
                      <div className="grid gap-2">
                        <FormField control={form.control} name="confirmPassword" render = {({ field }) => (
                            <FormItem>
                              <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                Confirm Password
                              </FormLabel>
                              <FormControl>
                                <Input type="password" className="!h-[40px]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )} />
                      </div>
                      <Button type="submit" disabled={isPending} className="w-full my-2">
                        {isPending && <Loader className="animate-spin" />} Sign up
                      </Button>
                    </div>
                    <div className="text-center text-sm mt-1">
                      Already have an account?{" "}
                      <Link to="/login" className="underline underline-offset-4"> Sign in </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          {/* <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default SignUp;