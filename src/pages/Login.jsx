import { useState, useContext,useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { startAuthentication } from "@simplewebauthn/browser";
import axios from "axios";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline"; // Import icons
import { AuthContext } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [method, setMethod] = useState("passkey"); // passkey, code
    const [step, setStep] = useState("start"); // start, verify-code
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { currentUser,updateUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();


    // 解析 URL 中的 redirect 参数
    const queryParams = new URLSearchParams(location.search);
    const redirectPath = queryParams.get('redirect') || '/'; // 如果没有 redirect 参数，默认跳转到根路径 '/'



    // 在组件加载时检查是否已登录，如果已登录则直接跳转
    useEffect(() => {
        if (currentUser) {
            // 如果用户已经登录，直接跳转到 redirectPath 或默认路径
            navigate(redirectPath, { replace: true }); // replace: true 替换当前历史记录，避免用户返回登录页
        }
    }, [currentUser, navigate, redirectPath]); // 依赖项包括 currentUser, navigate, redirectPath

    const handleStart = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (method === "passkey") {
                const optionsRes = await axios.post(
                    `${import.meta.env.VITE_API_URL}/login/options`,
                    { email },
                    { withCredentials: true }
                );
                const options = optionsRes.data;

                const authResponse = await startAuthentication(options);

                const verifyRes = await axios.post(
                    `${import.meta.env.VITE_API_URL}/login/verify`,
                    authResponse,
                    { withCredentials: true }
                );
                console.log(verifyRes.data);

                if (verifyRes.data.verified && verifyRes.data.data) {
                    updateUser(verifyRes.data.data);
                    // window.location.href = "/";

                } else {
                    setError("Authentication failed");
                }
            } else {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/login/code`,
                    { email },
                    { withCredentials: true }
                );
                setStep("verify-code");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const verifyRes = await axios.post(
                `${import.meta.env.VITE_API_URL}/login/verify-code`,
                { email, code },
                { withCredentials: true }
            );

            if (verifyRes.data.verified) {
                updateUser(verifyRes.data.data);
                // window.location.href = "/";
            } else {
                setError("Code verification failed");
            }
        } catch (err) {
            console.error("Verify code error:", err);
            setError(err.response?.data?.error || "Code verification failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex flex-col auth-container max-w-md mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            {error && <p className="text-error text-center mb-4">{error}</p>}

            {/* Button Group for Login Methods */}
            <div className="flex justify-center gap-2 mb-6">
                <button
                    onClick={() => setMethod("passkey")}
                    className={`flex items-center gap-3 ${
                    method === "passkey" ? "bg-primary" : "bg-secondary" // 选中时高亮，未选中时灰置
                }`}
                    
                >
                    <LockClosedIcon className="w-5 h-5" />
                    Use Passkey
                </button>
                <button
                    onClick={() => setMethod("code")}
                    className={`flex items-center gap-2 ${
                    method === "code" ? "bg-primary" : "bg-secondary"  // 选中时高亮，未选中时灰置
                }`}
                >
                    <EnvelopeIcon className="w-5 h-5" />
                    Use Code
                </button>

            </div>

            {step === "start" && (
                <form onSubmit={handleStart} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input input-bordered w-full"
                            placeholder="Enter your email"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full"
                    >
                        {loading
                            ? method === "passkey"
                                ? "Logging in..."
                                : "Sending..."
                            : method === "passkey"
                                ? "Login with Passkey"
                                : "Send Code"}
                    </button>
                </form>
            )}
            {step === "verify-code" && (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Verification Code of {email}</span>
                        </label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                            className="input input-bordered w-full"
                            placeholder="Enter your code"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full"
                    >
                        {loading ? "Verifying..." : "Verify Code"}
                    </button>
                </form>
            )}
            <div className="flex flex-row justify-end w-full my-2">
                <a href="/register" >Register</a>
            </div>
        </div>
    );
}

export default Login;