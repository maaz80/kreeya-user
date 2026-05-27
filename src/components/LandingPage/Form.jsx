import { useState, useRef, useEffect } from "react";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const fields = [
     { label: "Full Name", name: "fullName", type: "text" },
     { label: "Email Id", name: "email", type: "email" },
     { label: "Phone Number", name: "phone", type: "text" }
];

const Form = () => {
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

     //   Auto hide success message after 5 seconds
     useEffect(() => {
          if (successMessage) {
               const timer = setTimeout(() => {
                    setSuccessMessage("");
               }, 5000);
               return () => clearTimeout(timer);
          }
     }, [successMessage]);

     const handleChange = (e) => {
          const { name, value } = e.target;

          if (name === "phone") {
               const onlyNumbers = value.replace(/\D/g, "").slice(0, 10);
               setFormData({ ...formData, phone: onlyNumbers });
          } else {
               setFormData({ ...formData, [name]: value });
          }

          if (errors[name]) {
               setErrors({ ...errors, [name]: "" });
          }
     };

     const validateForm = () => {
          let newErrors = {};

          if (!formData.fullName.trim()) {
               newErrors.fullName = "Full Name is required";
          }
          if (!/^[0-9]{10}$/.test(formData.phone)) {
               newErrors.phone = "Phone number must be exactly 10 digits";
          }
          if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
               newErrors.email = "Enter a valid email address";
          }

          return newErrors;
     };

     const handleSendOTP = async (e) => {
          e.preventDefault();

          const validationErrors = validateForm();
          if (Object.keys(validationErrors).length > 0) {
               setErrors(validationErrors);
               const firstErrorField = Object.keys(validationErrors)[0];
               const errorElement = document.getElementById(`field-${firstErrorField}`);
               if (errorElement) {
                    errorElement.focus();
               }
               return;
          }

          setLoading(true);

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);

          try {
               const response = await fetch(`${import.meta.env.VITE_API_URL}/send-otp`, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                         phone: formData.phone,
                         email: formData.email
                    }),
                    signal: controller.signal,
               });

               clearTimeout(timeoutId);
               const result = await response.json();

               if (response.ok) {
                    setOtpStep(true);
                    setErrors({});
                    setResendTimer(60);
                    timerRef.current = setInterval(() => {
                         setResendTimer(prev => {
                              if (prev <= 1) {
                                   clearInterval(timerRef.current);
                                   return 0;
                              }
                              return prev - 1;
                         });
                    }, 1000);
               } else {
                    setErrors({ phone: result.error || "Failed to send OTP" });
               }
          } catch (error) {
               clearTimeout(timeoutId);
               console.error(error);
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
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                         phone: formData.phone,
                         email: formData.email
                    }),
               });

               const result = await response.json();

               if (response.ok) {
                    setResendTimer(60);
                    timerRef.current = setInterval(() => {
                         setResendTimer(prev => {
                              if (prev <= 1) {
                                   clearInterval(timerRef.current);
                                   return 0;
                              }
                              return prev - 1;
                         });
                    }, 1000);
                    setErrors({});
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
          const timeoutId = setTimeout(() => controller.abort(), 30000); //   Increased to 30 seconds

          try {
               const response = await fetch(`${import.meta.env.VITE_API_URL}/submit-booking`, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                         fullName: formData.fullName,
                         phone: formData.phone,
                         email: formData.email,
                         message: formData.message,
                         otp: formData.otp
                    }),
                    signal: controller.signal,
               });

               clearTimeout(timeoutId);
               const result = await response.json();

               if (response.ok) {
                    setStatus("success");
                    setSuccessMessage("  Booking submitted successfully! We'll contact you soon."); //   Success message
                    setFormData({ fullName: "", phone: "", email: "", message: "", otp: "" });
                    setOtpStep(false);
                    setErrors({});
                    if (timerRef.current) clearInterval(timerRef.current);

                    // Reset status after 3 seconds
                    setTimeout(() => {
                         setStatus("idle");
                    }, 3000);
               } else {
                    setStatus("error");
                    setErrors({ otp: result.error || "Invalid OTP" });
               }
          } catch (error) {
               clearTimeout(timeoutId);
               console.error(error);
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

     const getFieldId = (fieldName) => `field-${fieldName}`;

     return (
          <section className="relative z-9999 w-full px-4 md:px-8 py-20">
               <div className="max-w-325 mx-auto rounded-xl lg:rounded-[30px] shadow-[0_0_30px_rgba(0,0,0,0.12)] bg-white px-6 py-10 md:p-10 lg:p-15">
                    <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-1/2 h-[50%] w-0.75 divider-gradient" />

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
                         {/* LEFT TEXT */}
                         <div className="text-[36px] md:text-[56px] lg:text-[72px] leading-12 md:leading-15 lg:leading-21 text-start text-dark-black font-bold">
                              <span>We turn </span>
                              <span className="text-cust-orange">clicks</span>
                              <span> into </span>
                              <span className="text-cust-orange">clients</span>
                              <span> through</span>
                              <span> intelligent design.</span>
                         </div>

                         {/* RIGHT FORM */}
                         <form onSubmit={otpStep ? handleSubmitWithOTP : handleSendOTP} className="space-y-5 plus-jakarta-sans text-dark-gray" noValidate>
                              {/*   Success Message Display */}
                              {successMessage && (
                                   <div className="bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded-lg mb-4" role="alert">
                                        <span className="block sm:inline">{successMessage}</span>
                                   </div>
                              )}

                              {!otpStep ? (
                                   <>
                                        {fields.map((field) => {
                                             const fieldId = getFieldId(field.name);
                                             const hasError = !!errors[field.name];

                                             return (
                                                  <div key={field.name} className="flex flex-col gap-1">
                                                       <label
                                                            htmlFor={fieldId}
                                                            className="text-sm text-dark-black leading-5 font-medium"
                                                       >
                                                            {field.label}
                                                            {field.name === "phone" && (
                                                                 <span className="text-cust-orange ml-1">*</span>
                                                            )}
                                                       </label>

                                                       <div className="relative w-full">
                                                            <input
                                                                 id={fieldId}
                                                                 type={field.type}
                                                                 name={field.name}
                                                                 value={formData[field.name]}
                                                                 onChange={handleChange}
                                                                 placeholder={`Enter your ${field.label.toLowerCase()}`}
                                                                 aria-invalid={hasError}
                                                                 aria-describedby={hasError ? `${fieldId}-error` : undefined}
                                                                 className={`border rounded-sm text-sm px-2 h-9 outline-none focus:ring-2 focus:ring-cust-orange w-full transition-colors ${hasError
                                                                      ? "border-red-500 focus:ring-red-500"
                                                                      : "border-dark-black/12 focus:ring-cust-orange"
                                                                      }`}
                                                            />
                                                            {hasError && (
                                                                 <p
                                                                      id={`${fieldId}-error`}
                                                                      className="text-red-500 text-xs mt-1"
                                                                      role="alert"
                                                                 >
                                                                      {errors[field.name]}
                                                                 </p>
                                                            )}
                                                       </div>
                                                  </div>
                                             );
                                        })}

                                        {/* TEXTAREA */}
                                        <div className="flex flex-col gap-1 font-medium">
                                             <label
                                                  htmlFor="field-message"
                                                  className="text-sm text-dark-black"
                                             >
                                                  Description <span className="text-gray-500">(optional)</span>
                                             </label>

                                             <textarea
                                                  id="field-message"
                                                  name="message"
                                                  value={formData.message}
                                                  onChange={handleChange}
                                                  placeholder="Tell us about your project..."
                                                  className="text-sm border border-dark-black/12 rounded-sm px-2 py-2 h-20 outline-none resize-none focus:ring-2 focus:ring-cust-orange"
                                                  aria-describedby={errors.message ? "message-error" : undefined}
                                             />
                                             {errors.message && (
                                                  <p
                                                       id="message-error"
                                                       className="text-red-500 text-xs mt-1"
                                                       role="alert"
                                                  >
                                                       {errors.message}
                                                  </p>
                                             )}
                                        </div>

                                        {/* Send OTP Button */}
                                        <button
                                             type="submit"
                                             disabled={loading}
                                             className={`${loading ? 'cursor-not-allowed' : 'cursor-pointer'} group relative isolate overflow-hidden text-[20px] w-full h-15 flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 text-white bg-cust-orange hover:bg-cust-orange/90 active:scale-99`}
                                        >
                                             {loading ? (
                                                  <>
                                                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                       <span className="relative z-10 ml-2">Submitting...</span>
                                                  </>
                                             ) : (
                                                  <>
                                                       <span className="relative z-10">Submit</span>
                                                       <HiOutlineArrowLongRight size={30} className="relative z-10 text-white group-hover:translate-x-1 transition-transform" />
                                                  </>
                                             )}
                                        </button>
                                   </>
                              ) : (
                                   <>
                                        {/* OTP Verification Step */}
                                        <div className="bg-orange-50 p-4 rounded-lg mb-2 border border-orange-200">
                                             <p className="text-sm text-dark-black mb-1 font-medium">
                                                  ✓ OTP sent to <span className="text-cust-orange">{formData.email}</span>
                                             </p>
                                             <p className="text-xs text-gray-600">
                                                  Enter the 6-digit verification code sent to your email
                                             </p>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                             <label htmlFor="otp-input" className="text-sm text-dark-black leading-5 font-medium">
                                                  OTP Code <span className="text-cust-orange">*</span>
                                             </label>
                                             <input
                                                  id="otp-input"
                                                  type="text"
                                                  name="otp"
                                                  value={formData.otp}
                                                  onChange={handleChange}
                                                  placeholder="Enter 6-digit OTP"
                                                  maxLength={6}
                                                  className={`border rounded-sm text-sm px-2 h-9 outline-none focus:ring-2 focus:ring-cust-orange w-full transition-colors ${errors.otp ? "border-red-500" : "border-dark-black/12"
                                                       }`}
                                             />
                                             {errors.otp && (
                                                  <p className="text-red-500 text-xs mt-1" role="alert">
                                                       {errors.otp}
                                                  </p>
                                             )}
                                        </div>

                                        {/* Resend OTP & Edit Details */}
                                        <div className="flex justify-between items-center">
                                             <button
                                                  type="button"
                                                  onClick={handleResendOTP}
                                                  disabled={resendTimer > 0 || loading}
                                                  className={`text-sm ${resendTimer > 0 || loading
                                                       ? "text-gray-400 cursor-not-allowed"
                                                       : "text-cust-orange hover:underline cursor-pointer"
                                                       }`}
                                             >
                                                  {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                                             </button>
                                             <button
                                                  type="button"
                                                  onClick={() => {
                                                       setOtpStep(false);
                                                       setFormData({ ...formData, otp: "" });
                                                       setErrors({});
                                                       setStatus("idle");
                                                       if (timerRef.current) clearInterval(timerRef.current);
                                                  }}
                                                  className="text-sm text-gray-500 hover:text-cust-orange cursor-pointer"
                                             >
                                                  ← Edit Details
                                             </button>
                                        </div>

                                        {/* Submit Button with OTP */}
                                        <button
                                             type="submit"
                                             disabled={status === "loading"}
                                             className={`${status === 'loading' ? 'cursor-not-allowed' : 'cursor-pointer'} group relative isolate overflow-hidden text-[20px] w-full h-15 flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 active:scale-99 ${status === "loading"
                                                  ? "text-cust-orange bg-white border-cust-orange border"
                                                  : status === "success"
                                                       ? "text-green-600 bg-white border-green-500 border"
                                                       : status === "error" || status === "timeout"
                                                            ? "text-white bg-red-500 border-red-500 border"
                                                            : "text-white bg-cust-orange hover:bg-cust-orange/90"
                                                  }`}
                                        >
                                             {status === "idle" && (
                                                  <>
                                                       <span className="relative z-10">Verify & Submit</span>
                                                       <HiOutlineArrowLongRight size={30} className="relative z-10 text-white group-hover:translate-x-1 transition-transform" />
                                                  </>
                                             )}

                                             {status === "loading" && (
                                                  <>
                                                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                       <span className="relative z-10 ml-2">Verifying...</span>
                                                  </>
                                             )}

                                             {status === "success" && (
                                                  <span className="relative z-10 flex items-center gap-2" role="status">
                                                       ✓ Submitted Successfully
                                                  </span>
                                             )}

                                             {(status === "error" || status === "timeout") && (
                                                  <span
                                                       className="relative z-10 cursor-pointer flex items-center gap-2"
                                                       onClick={(e) => {
                                                            e.stopPropagation();
                                                            setStatus("idle");
                                                       }}
                                                       role="button"
                                                       tabIndex={0}
                                                  >
                                                       {status === "error" ? "❌ Failed. Try Again" : "⏱️ Timed Out. Try Again"}
                                                  </span>
                                             )}
                                        </button>
                                   </>
                              )}

                              {/* Live region for screen reader */}
                              <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                                   {loading && "Sending OTP..."}
                                   {status === "loading" && "Verifying..."}
                                   {status === "success" && "Form submitted successfully!"}
                                   {(status === "error" || status === "timeout") && "Submission failed. Please try again."}
                              </div>
                         </form>
                    </div>
               </div>

          </section>
     );
};

export default Form;