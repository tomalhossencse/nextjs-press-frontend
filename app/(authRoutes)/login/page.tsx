import LoginFrom from "../_components/loginFrom";

export default function LoginPage() {
    return (
        <>
            <div className="flex min-h-screen items-center justify-center">
                <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
                    {/* from generic texts */}
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Welcome back!</h1>
                        <p className="text-gray-500">
                            Enter your credentials to access your account
                        </p>
                    </div>
                    {/* form */}
                    <LoginFrom />
                </div>
            </div>
        </>
    );
}
