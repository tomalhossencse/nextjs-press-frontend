"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerAction } from "../_services/authActions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const RegisteForm = () => {
    const [state, action, pending] = useActionState(registerAction, false);
    const router = useRouter()

    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message || "Registration Successful");
            router.push("/login")
        }
        if (!state.success) {
            toast.error(state.message || "Registration Failed");
        }
    }, [state, router]);

    return (
        <form action={action} className="space-y-4">
            <Card className="p-5 space-y-4">
                <Input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                />
                <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                />
                <Button disabled={pending} type="submit">
                    {pending ? "Registering...." : "Register"}
                </Button>
            </Card>
        </form>
    );
};

export default RegisteForm;
