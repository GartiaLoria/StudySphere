import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/logo";
import { toast } from "@/hooks/useToast";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { loginUserMutationFn } from "@/apis/auth.apis";
import { useAuthContext } from "@/context/AuthProvider";
// import { decodeToken } from "react-jwt";
const SignIn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuthContext()
  const { mutate, isPending } = useMutation({
    mutationFn: loginUserMutationFn,
  });

  const formSchema = z.object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().trim().min(1, "Password is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", },
  });
  const onSubmit = values => {
    console.log(values)
    if (isPending) return;
    mutate(values, {
      onSuccess: (res) => {
        // const user = data.user;
        console.log("Login success response", res.data);
        toast({
          title: "Authentication Success",
          description: res.data.message,
          variant: "success",
        });
        // console.log("Login Token", res.data.SignedToken);
        login(res.data.SignedToken)
        navigate("/")
        // const decodedUrl = returnUrl ? decodeURIComponent(returnUrl) : null;
        // console.log("decoded url = ", decodedUrl)
        // navigate(decodedUrl || `/workspace/${user.currentWorkspace}`);
      },
      onError: (error) => {
        toast({
          title: "Login Failed",
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
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>
                Login with your Email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit = { form.handleSubmit(onSubmit) }>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
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
                        <FormField control = { form.control } name="password" render = {({ field }) => (
                          <FormItem>
                            <div className="flex items-center">
                              <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                Password
                              </FormLabel>
                            </div>
                            <FormControl>
                              <Input type="password" className="!h-[40px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      <Button disabled = { isPending } type = "submit" className = "w-full my-2">
                        {isPending && <Loader className="animate-spin" />} Login
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Don&apos;t have an account?{" "}
                      <Link to="/register" className="underline underline-offset-4">
                        Register
                      </Link>
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
}
export default SignIn