import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const fields = [
    { label: "Full Name", name: "fullName", type: "text" },
    { label: "Email Id", name: "email", type: "email" },
    { label: "Phone Number", name: "phone", type: "text" }
];

const LeadCaptureModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState("idle");
    const [otpStep, setOtpStep] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        message: "",
        otp: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [successMessage, setSuccessMessage] = useState("");
    const timerRef = useRef(null);

    useEffect(() => {
        // Check if modal has already been shown
        const hasBeenShown = localStorage.getItem("leadModalShown");
        if (hasBeenShown === "true") return;

        // Show modal after 10 seconds (10000ms)
        const timer = setTimeout(() => {
            setIsOpen(true);
            localStorage.setItem("leadModalShown", "true");
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!successMessage) return undefined;
        const timer = setTimeout(() => {
            setSuccessMessage("");
            setIsOpen(false); // Close modal on success completion
        }, 5000);
        return () => clearTimeout(timer);
    }, [successMessage]);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const onlyNumbers = value.replace(/\D/g, "").slice(0, 10);
            setFormData((prev) => ({ ...prev, phone: onlyNumbers }));
        } else if (name === "otp") {
            const otpDigits = value.replace(/\D/g, "").slice(0, 6);
            setFormData((prev) => ({ ...prev, otp: otpDigits }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be exactly 10 digits";
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Enter a valid email address";
        return newErrors;
    };

    const startResendTimer = () => {
        setResendTimer(60);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            const firstErrorField = Object.keys(validationErrors)[0];
            const errorElement = document.getElementById(`modal-field-${firstErrorField}`);
            if (errorElement) errorElement.focus();
            return;
        }

        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone: formData.phone,
                    email: formData.email
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            const result = await response.json();

            if (response.ok) {
                setOtpStep(true);
                setErrors({});
                startResendTimer();
            } else {
                setErrors({ phone: result.error || "Failed to send OTP" });
            }
        } catch (error) {
            clearTimeout(timeoutId);
            setErrors({ phone: error.name === "AbortError" ? "Request timeout" : "Failed to send OTP" });
        }

        setLoading(false);
    };

    const handleResendOTP = async () => {
        if (resendTimer > 0) return;
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone: formData.phone,
                    email: formData.email
                })
            });

            const result = await response.json();
            if (response.ok) {
                setErrors({});
                startResendTimer();
            } else {
                setErrors({ otp: result.error || "Failed to resend OTP" });
            }
        } catch (error) {
            console.error(error);
            setErrors({ otp: "Failed to resend OTP" });
        }

        setLoading(false);
    };

    const handleSubmitWithOTP = async (e) => {
        e.preventDefault();

        if (!formData.otp || formData.otp.length !== 6) {
            setErrors({ otp: "Please enter 6-digit OTP" });
            return;
        }

        setStatus("loading");
        setLoading(true);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/submit-booking`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: formData.fullName,
                    phone: formData.phone,
                    email: formData.email,
                    message: formData.message,
                    otp: formData.otp
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            const result = await response.json();

            if (response.ok) {
                setStatus("success");
                setSuccessMessage("Booking submitted successfully! We'll contact you soon.");
                setFormData({ fullName: "", phone: "", email: "", message: "", otp: "" });
                setOtpStep(false);
                setErrors({});
                if (timerRef.current) clearInterval(timerRef.current);
            } else {
                setStatus("error");
                setErrors({ otp: result.error || "Invalid OTP" });
            }
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === "AbortError") {
                setStatus("timeout");
                setErrors({ otp: "Request timeout. Please try again." });
            } else {
                setStatus("error");
                setErrors({ otp: "Failed to submit. Please try again." });
            }
        }

        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 plus-jakarta-sans">
            {/* Backdrop with Blur */}
            <div 
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out"
            />

            {/* Modal Box */}
            <div className="relative bg-[#fafafa] w-full max-w-[480px] rounded-2xl p-6 md:p-8 shadow-2xl z-10 border border-black/5 animate-scale-up overflow-hidden max-h-[95vh] overflow-y-auto">
                
                {/* Close Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center border border-dark-black/10 bg-white text-dark-black hover:bg-cust-orange hover:border-cust-orange hover:text-white hover:rotate-90 transition-all duration-300 shadow-sm cursor-pointer z-50 focus:outline-none"
                    aria-label="Close modal"
                >
                    <IoClose size={20} />
                </button>

                {/* Main Content / Form */}
                <div className="mt-2 text-left">
                    <h2 className="text-xl md:text-2xl mb-5 font-bold text-dark-black tracking-tight leading-tight">
                       Let's Craft Brilliance together
                    </h2>
                    {/* <p className="text-xs md:text-sm text-dark-gray mt-1.5 mb-6">
                        Enter your details below and our team will get in touch with you shortly.
                    </p> */}

                    <form onSubmit={otpStep ? handleSubmitWithOTP : handleSendOTP} className="space-y-4" noValidate>
                        {successMessage && (
                            <div className="bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded-lg text-sm" role="alert">
                                <span className="block sm:inline">{successMessage}</span>
                            </div>
                        )}

                        {!otpStep ? (
                            <>
                                {fields.map((field) => {
                                    const fieldId = `modal-field-${field.name}`;
                                    const hasError = !!errors[field.name];

                                    return (
                                        <div key={field.name} className="flex flex-col gap-1">
                                            <label htmlFor={fieldId} className="text-xs font-semibold text-dark-black">
                                                {field.label}
                                                {field.name === "phone" && <span className="text-cust-orange ml-1">*</span>}
                                            </label>
                                            <input
                                                id={fieldId}
                                                type={field.type}
                                                name={field.name}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                placeholder={`Enter your ${field.label.toLowerCase()}`}
                                                aria-invalid={hasError}
                                                className={`w-full bg-white border rounded-xl px-4 h-11 text-sm text-dark-black placeholder-dark-black/40 focus:outline-none focus:ring-2 transition-all ${hasError ? "border-red-400 focus:ring-red-400" : "border-dark-black/12 focus:ring-cust-orange/30 focus:border-cust-orange"}`}
                                            />
                                            {hasError && <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>}
                                        </div>
                                    );
                                })}

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="modal-field-message" className="text-xs font-semibold text-dark-black">
                                        Description <span className="text-gray-400 font-normal">(optional)</span>
                                    </label>
                                    <textarea
                                        id="modal-field-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your project..."
                                        className="w-full bg-white border border-dark-black/12 rounded-xl px-4 py-3 h-20 text-sm text-dark-black placeholder-dark-black/40 focus:outline-none focus:ring-2 focus:ring-cust-orange/30 focus:border-cust-orange resize-none transition-all"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                    className={`${loading ? "cursor-not-allowed opacity-60 hover:text-cust-orange" : "cursor-pointer hover:text-cust-orange"} header-btn hover:border hover:border-cust-orange duration-300 ease-in-out group relative isolate overflow-hidden bg-cust-orange text-white text-[15px] md:text-[18px] w-full h-12 lg:h-14 flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 active:scale-99 mt-4`}
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin relative z-10" />
                                            <span className="relative z-10 ml-2">Booking...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="relative z-10">Submit</span>
                                            <HiOutlineArrowLongRight size={20} className="relative z-10 text-white transition-all duration-300 group-hover:text-cust-orange min-w-5 min-h-5" />
                                        </>
                                    )}
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 text-left">
                                    <p className="text-sm text-black mb-1 font-medium">
                                        ✓ OTP sent to <span className="text-cust-orange">{formData.email}</span>
                                    </p>
                                    <p className="text-xs text-gray-600 font-normal">Enter the 6-digit verification code sent to your email</p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="modal-otp-input" className="text-xs font-semibold text-dark-black">
                                        OTP Code <span className="text-cust-orange">*</span>
                                    </label>
                                    <input
                                        id="modal-otp-input"
                                        type="text"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        placeholder="Enter 6-digit OTP"
                                        maxLength={6}
                                        className={`w-full bg-white border rounded-xl px-4 h-11 text-sm text-dark-black placeholder-dark-black/40 focus:outline-none focus:ring-2 transition-all ${errors.otp ? "border-red-400 focus:ring-red-400" : "border-dark-black/12 focus:ring-cust-orange/30 focus:border-cust-orange"}`}
                                    />
                                    {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                                </div>

                                <div className="flex justify-between items-center text-xs">
                                    <button
                                        type="button"
                                        onClick={handleResendOTP}
                                        disabled={resendTimer > 0 || loading}
                                        className={`font-semibold ${resendTimer > 0 || loading ? "text-gray-400 cursor-not-allowed" : "text-cust-orange hover:underline cursor-pointer"}`}
                                    >
                                        {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOtpStep(false);
                                            setFormData((prev) => ({ ...prev, otp: "" }));
                                            setErrors({});
                                            setStatus("idle");
                                            if (timerRef.current) clearInterval(timerRef.current);
                                        }}
                                        className="text-gray-500 hover:text-cust-orange cursor-pointer"
                                    >
                                        ← Edit Details
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                      className={`${status === "loading" ? "cursor-not-allowed opacity-60" : "cursor-pointer "} header-btn hover:text-cust-orange hover:border hover:border-cust-orange duration-300 ease-in-out group relative isolate overflow-hidden bg-cust-orange text-white text-[15px] md:text-[18px] w-full h-12 lg:h-14 flex items-center justify-center gap-2 rounded-full font-medium transition-all  mt-4`}
                                >
                                    {status === "loading" ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin relative z-10" />
                                            <span className="relative z-10 ml-2">Verifying...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="relative z-10">
                                                {status === "success" ? "✓ Submitted" : "Verify & Submit"}
                                            </span>
                                            {status !== "success" && (
                                                <HiOutlineArrowLongRight size={20} className="relative z-10 text-white transition-all duration-300 group-hover:text-cust-orange min-w-5 min-h-5" />
                                            )}
                                        </>
                                    )}
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LeadCaptureModal;
