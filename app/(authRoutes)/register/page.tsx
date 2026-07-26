import RegisteForm from "../_components/RegisterForm";

export default function RegisterPage() {
    return (
        <>
            <div className="flex min-h-[90vh] items-center justify-center">
                <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
                    {/* from generic texts */}
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Create New Account</h1>
                        <p className="text-gray-500">
                            Enter your credentials to access your account
                        </p>
                    </div>
                    {/* form */}
                    <RegisteForm />
                </div>
            </div>
        </>
    );
}
