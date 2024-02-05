import React from "react";
import { router, useForm } from "@inertiajs/react";
import { FloatingLabel } from "flowbite-react";

const Login = () => {
    const {data, setData} = useForm({
        'email' : "",
        'password' : '',
    })

    function submit (e) {
        e.preventDefault();
        router.post(route('admin.login.store'), data, {
            onSuccess : () => {
                
            },
            onError : (err) => {
                console.log(err)
            }
        })
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form onSubmit={submit} className="space-y-6">
                    <h5 className="text-xl text-center font-medium text-gray-900 dark:text-white">
                        Sign in to TenThone Admin 
                    </h5>
                    <div>
                        <FloatingLabel
                            label="email address"
                            type="email"
                            variant="outlined"
                            required={true}
                            onChange={e => setData('email', e.target.value)}
                        />
                    </div>
                    <div>
                        <FloatingLabel
                            type="password"
                            label="your password"
                            variant="outlined"
                            required={true}
                            onChange={e => setData('password', e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Login to your account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
