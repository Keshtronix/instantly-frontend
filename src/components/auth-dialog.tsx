import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  loginMutationFn,
  registerMutationFn,
  forgotPasswordMutationFn,
} from "@/lib/api";
import type {
  LoginType,
  RegisterType,
  ForgotPasswordType,
} from "@/types/auth.type";
import Logo from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useState } from "react";
import { MailCheckIcon } from "lucide-react";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().trim().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().trim().min(1, "Password is required"),
});

const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

export const AuthDialog = () => {
  const { isAuthOpen, closeAuth, view, setView } = useAuth();
  const queryClient = useQueryClient();

  const fetchCart = useCart((state) => state.fetchCart);

  // track successful registration + the email used
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  // NEW: track successful "forgot password" submission
  const [isResetSent, setIsResetSent] = useState(false);

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: loginMutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      await fetchCart();
      toast.success("Successfully logged in!");
      closeAuth();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to login. Try again.",
      );
    },
  });

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: registerMutationFn,
    onSuccess: async (_data, variables) => {
      // Don't invalidate/fetchCart/closeAuth yet — user isn't verified/logged in
      setRegisteredEmail(variables.email);
      setIsRegistered(true);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to create account. Try again.",
      );
    },
  });

  // NEW: Forgot Password Mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPasswordMutationFn,
    onSuccess: () => {
      setIsResetSent(true);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to send reset link. Try again.",
      );
    },
  });

  // Forms Setup
  const loginForm = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // NEW: forgot-password form
  const forgotPasswordForm = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onLoginSubmit = (values: LoginType) => {
    loginMutation.mutate(values);
  };

  const onRegisterSubmit = (values: RegisterType) => {
    registerMutation.mutate(values);
  };

  // NEW
  const onForgotPasswordSubmit = (values: ForgotPasswordType) => {
    forgotPasswordMutation.mutate(values);
  };

  // Reset the success state whenever the dialog closes or view changes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeAuth();
      setIsRegistered(false);
      registerForm.reset();
      // NEW
      setIsResetSent(false);
      forgotPasswordForm.reset();
    }
  };

  // NEW: reset the "check your email" state whenever the user navigates away
  // from the forgot-password view (e.g. back to login)
  const goToView = (nextView: "login" | "register" | "forgot-password") => {
    setIsResetSent(false);
    forgotPasswordForm.reset();
    setView(nextView);
  };

  return (
    <Dialog open={isAuthOpen} onOpenChange={handleOpenChange}>
      <DialogContent key={view} className="sm:max-w-md py-8 px-8">
        {isRegistered ? (
          <div className="flex flex-col items-center justify-center gap-2 py-6">
            <MailCheckIcon size={48} className="animate-bounce" />
            <h2 className="text-xl font-bold">Check your email</h2>
            <p className="mb-2 text-center text-sm text-muted-foreground">
              We just sent a verification link to {registeredEmail}.
            </p>
            <Button
              className="h-[40px]"
              onClick={() => {
                setIsRegistered(false);
                setView("login");
              }}
            >
              Go to login
            </Button>
          </div>
        ) : view === "forgot-password" && isResetSent ? (
          // NEW: "check your email" success state for password reset
          <div className="flex flex-col items-center justify-center gap-2 py-6">
            <MailCheckIcon size={48} className="animate-bounce" />
            <h2 className="text-xl font-bold">Check your email</h2>
            <p className="mb-2 text-center text-sm text-muted-foreground">
              If an account exists for{" "}
              {forgotPasswordForm.getValues("email")}, we've sent a link to
              reset your password.
            </p>
            <Button className="h-[40px]" onClick={() => goToView("login")}>
              Back to login
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="flex flex-col items-center justify-center gap-1">
              <Logo />
              <DialogTitle className="text-2xl font-semibold tracking-tight">
                {view === "login"
                  ? "Sign in to your account"
                  : view === "register"
                    ? "Create your account"
                    : "Reset your password"}
              </DialogTitle>
            </DialogHeader>

            {view === "login" ? (
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  className="space-y-4 py-2"
                >
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          {/* NEW: forgot password trigger */}
                          <button
                            type="button"
                            onClick={() => goToView("forgot-password")}
                            className="text-xs font-medium text-muted-foreground underline underline-offset-4 cursor-pointer"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            autoComplete="current-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-white hover:bg-[var(--btn-cart)]"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Signing in..." : "Sign in"}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setView("register")}
                      className="font-medium text-foreground underline underline-offset-4 cursor-pointer"
                    >
                      Sign up
                    </button>
                  </p>
                </form>
              </Form>
            ) : view === "register" ? (
              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                  className="space-y-4 py-2"
                >
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            autoComplete="name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-white hover:bg-[var(--btn-cart)]"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending
                      ? "Creating account..."
                      : "Create account"}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setView("login")}
                      className="font-medium text-foreground underline underline-offset-4 cursor-pointer"
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              </Form>
            ) : (
              // NEW: forgot-password view
              <Form {...forgotPasswordForm}>
                <form
                  onSubmit={forgotPasswordForm.handleSubmit(
                    onForgotPasswordSubmit,
                  )}
                  className="space-y-4 py-2"
                >
                  <p className="text-sm text-muted-foreground text-center">
                    Enter the email associated with your account and we'll
                    send you a link to reset your password.
                  </p>

                  <FormField
                    control={forgotPasswordForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary text-white hover:bg-[var(--btn-cart)]"
                    disabled={forgotPasswordMutation.isPending}
                  >
                    {forgotPasswordMutation.isPending
                      ? "Sending..."
                      : "Send reset link"}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    <button
                      type="button"
                      onClick={() => goToView("login")}
                      className="font-medium text-foreground underline underline-offset-4 cursor-pointer"
                    >
                      Back to login
                    </button>
                  </p>
                </form>
              </Form>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};