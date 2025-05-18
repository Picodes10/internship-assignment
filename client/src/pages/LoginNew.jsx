import React, { useState } from "react";

const AuthPageNew = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ email: "", password: "", name: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            // Login logic
            try {
                const response = await fetch("/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: form.email,
                        password: form.password,
                    }),
                });
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("token", data.token);
                    setSuccess("Login successful!");
                    setError("");
                    // Optionally redirect or update UI here
                } else {
                    const data = await response.json();
                    setError(data.error || "Login failed");
                    setSuccess("");
                }
            } catch (err) {
                setError("Login failed: " + err.message);
                setSuccess("");
            }
        } else {
            // Signup logic
            try {
                const response = await fetch("/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: form.email,
                        password: form.password,
                    }),
                });
                if (response.ok) {
                    setSuccess("Signup successful! You can now log in.");
                    setError("");
                    setForm({ email: "", password: "", name: "" });
                    setIsLogin(true);
                } else {
                    const data = await response.json();
                    setError(data.error || "Signup failed");
                    setSuccess("");
                }
            } catch (err) {
                setError("Signup failed: " + err.message);
                setSuccess("");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>
                {error && (
                    <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
                )}
                {success && (
                    <div className="mb-4 text-green-600 text-sm text-center">{success}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block mb-1 font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    {isLogin ? (
                        <span>
                            Don't have an account?{" "}
                            <button
                                className="text-blue-600 hover:underline"
                                onClick={() => setIsLogin(false)}
                            >
                                Sign Up
                            </button>
                        </span>
                    ) : (
                        <span>
                            Already have an account?{" "}
                            <button
                                className="text-blue-600 hover:underline"
                                onClick={() => setIsLogin(true)}
                            >
                                Login
                            </button>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPageNew;
