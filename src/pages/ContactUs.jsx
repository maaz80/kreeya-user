import { lazy, Suspense, useEffect, useState, useRef } from "react";
import BgImage from "../assets/bg.webp";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import shakingHand from '../assets/contact-bg.webp';
import { useH2Data } from "../hooks/useH2data";
import { useH1Data } from "../hooks/useH1Data";
import { useh3Data } from "../hooks/useH3Data";
import useFaq from "../hooks/useFaq";
// import Details from "../components/Contact/Details";

const Breadcrumb = lazy(() => import('../components/Breadcrumb'));
// const HomeNavbar = lazy(() => import('../components/HomeNavbar'));
const HomeNavbarV2 = lazy(() => import('../components/HomeNavbarV2'));
const FaqSection = lazy(() => import('../components/FaqSection'));
const YouMayLike = lazy(() => import('../components/YouMayLike'));

const ContactUs = () => {
     //   OTP States
     const [status, setStatus] = useState("idle");
     const [otpStep, setOtpStep] = useState(false);
     const [formData, setFormData] = useState({
          fullName: "",
          phone: "",
          email: "",
          message: "",
          otp: ""  //   Added otp field
     });
     const [errors, setErrors] = useState({});
     const [loading, setLoading] = useState(false);
     const [resendTimer, setResendTimer] = useState(0);
     const [successMessage, setSuccessMessage] = useState("");
     const timerRef = useRef(null);
     const h3Contact = useh3Data()
     const h2Contact = useH2Data()
     const h1Contact = useH1Data()
     const { faqData } = useFaq();
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

          // Clear error for this field
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

     //   Send OTP
     const handleSendOTP = async (e) => {
          e.preventDefault();

          const validationErrors = validateForm();
          if (Object.keys(validationErrors).length > 0) {
               setErrors(validationErrors);
               const firstErrorField = Object.keys(validationErrors)[0];
               const errorElement = document.getElementById(firstErrorField);
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

     //   Resend OTP
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

     //   Submit with OTP Verification
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
                    setSuccessMessage("  Booking submitted successfully! We'll contact you soon.");
                    setFormData({ fullName: "", phone: "", email: "", message: "", otp: "" });
                    setOtpStep(false);
                    setErrors({});
                    if (timerRef.current) clearInterval(timerRef.current);

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

     useEffect(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
     }, []);

     return (
          <section
               className="relative px-5 md:px-15 lg:px-20 2xl:px-30 py-26 bg-cover bg-center plus-jakarta-sans"
               style={{ backgroundImage: `url(${BgImage})` }}
          >
               {/* <SeoTags
                    title="Contact Kreeya Design | UI/UX, Branding & Web Design Agency"
                    description="Get in touch with Kreeya Design for UI/UX, branding, and web design services that help startups and enterprises grow through exceptional digital experiences."
                    keywords="contact Kreeya Design, web design enquiry, branding services enquiry, UI UX agency contact, digital agency contact"
                    canonical="https://kreeyadesign.com/contact"
               /> */}

               <Suspense fallback={null}>
                    {/* <HomeNavbar /> */}
                    <HomeNavbarV2 />
               </Suspense>
               <Suspense fallback={null}>
                    <Breadcrumb />
               </Suspense>

               {/* Overlay */}
               <div className="absolute inset-0 bg-white/80 z-10"></div>

               <div className="relative z-20 max-w-195 mx-auto mb-10 md:mb-20 mt-14">
                    {/* Heading */}
                    <h1 className="text-center text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[72px] leading-tight poiret-one-regular text-dark-black mt-8 mb-8">
                         {h1Contact.first_line_heading || 'Got something in mind?'} <br /> {h1Contact.second_line_heading || "We'd love to help."}
                    </h1>

                    {/* Personal Details */}
                    <div className="mt-8">
                         <h2 className="text-[20px] md:text-[36px] lg:text-[40px] font-medium md:font-normal poiret-one-regular text-dark-black mb-2">
                              {h2Contact.form_heading || 'Let\'s start with your personal details'}
                         </h2>
                         <p className="text-[12px] md:text-[14px] text-dark-gray mb-6">
                              It helps us know who we are interacting with
                         </p>

                         {/* Form */}
                         <form onSubmit={otpStep ? handleSubmitWithOTP : handleSendOTP} noValidate>
                              {/*   Success Message Display */}
                              {successMessage && (
                                   <div className="bg-green-50 border border-green-500 text-green-700 px-4 py-3 rounded-lg mb-4" role="alert">
                                        <span className="block sm:inline">{successMessage}</span>
                                   </div>
                              )}

                              {!otpStep ? (
                                   <>
                                        {/* Full Name */}
                                        <div className="space-y-5">
                                             <div>
                                                  <label htmlFor="fullName" className="text-[12px] md:text-[14px] text-dark-black font-medium">
                                                       Full Name <span className="text-cust-orange">*</span>
                                                  </label>
                                                  <input
                                                       id="fullName"
                                                       type="text"
                                                       name="fullName"
                                                       value={formData.fullName}
                                                       onChange={handleChange}
                                                       placeholder="Enter your Name"
                                                       required
                                                       aria-required="true"
                                                       aria-invalid={!!errors.fullName}
                                                       aria-describedby={errors.fullName ? "fullName-error" : undefined}
                                                       className="w-full mt-1 h-10 bg-white border border-dark-black/12 px-3 text-sm outline-none rounded-sm focus:ring-2 focus:ring-cust-orange"
                                                  />
                                                  {errors.fullName && (
                                                       <p id="fullName-error" className="text-red-500 text-xs mt-1" role="alert">
                                                            {errors.fullName}
                                                       </p>
                                                  )}
                                             </div>

                                             {/* Email */}
                                             <div>
                                                  <label htmlFor="email" className="text-[12px] md:text-[14px] text-dark-black font-medium">
                                                       Email Id <span className="text-cust-orange">*</span>
                                                  </label>
                                                  <input
                                                       id="email"
                                                       type="email"
                                                       name="email"
                                                       value={formData.email}
                                                       onChange={handleChange}
                                                       placeholder="Enter your email id"
                                                       required
                                                       aria-required="true"
                                                       aria-invalid={!!errors.email}
                                                       aria-describedby={errors.email ? "email-error" : undefined}
                                                       className="w-full mt-1 h-10 bg-white border border-dark-black/12 px-3 text-sm outline-none rounded-sm focus:ring-2 focus:ring-cust-orange"
                                                  />
                                                  {errors.email && (
                                                       <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">
                                                            {errors.email}
                                                       </p>
                                                  )}
                                             </div>

                                             {/* Phone */}
                                             <div>
                                                  <label htmlFor="phone" className="text-[12px] md:text-[14px] text-dark-black font-medium">
                                                       Phone Number <span className="text-cust-orange">*</span>
                                                  </label>
                                                  <input
                                                       id="phone"
                                                       type="tel"
                                                       name="phone"
                                                       value={formData.phone}
                                                       onChange={handleChange}
                                                       maxLength="10"
                                                       placeholder="Enter your phone number"
                                                       required
                                                       aria-required="true"
                                                       aria-invalid={!!errors.phone}
                                                       aria-describedby={errors.phone ? "phone-error" : undefined}
                                                       className="w-full mt-1 h-10 bg-white border border-dark-black/12 px-3 text-sm outline-none rounded-sm focus:ring-2 focus:ring-cust-orange"
                                                  />
                                                  {errors.phone && (
                                                       <p id="phone-error" className="text-red-500 text-xs mt-1" role="alert">
                                                            {errors.phone}
                                                       </p>
                                                  )}
                                             </div>
                                        </div>

                                        {/* Project Section */}
                                        <div className="mt-10">
                                             <h2 className="text-[20px] md:text-[36px] lg:text-[40px] font-medium md:font-normal text-dark-black mb-2">
                                                  {h2Contact.description_heading || 'Tell us about your project requirement'}
                                             </h2>
                                             <p className="text-[12px] md:text-[14px] text-dark-gray mb-6">
                                                  Looking for UX/UI research or product branding? Post your query now, and we'll get in touch with you soon!
                                             </p>

                                             <label htmlFor="message" className="sr-only">
                                                  Project description
                                             </label>
                                             <textarea
                                                  id="message"
                                                  name="message"
                                                  value={formData.message}
                                                  onChange={handleChange}
                                                  placeholder="How can we help?"
                                                  aria-describedby={errors.message ? "message-error" : undefined}
                                                  className="w-full h-32 bg-white border border-dark-black/12 p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-cust-orange"
                                             />
                                             {errors.message && (
                                                  <p id="message-error" className="text-red-500 text-xs mt-1" role="alert">
                                                       {errors.message}
                                                  </p>
                                             )}
                                        </div>

                                        {/* Send OTP Button */}
                                        <div className="flex flex-col items-center mt-10">
                                             <button
                                                  type="submit"
                                                  disabled={loading}
                                                  className={`text-white px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${loading ? 'bg-cust-orange/60 cursor-not-allowed' : 'bg-cust-orange hover:bg-cust-orange/90 hover:scale-105 cursor-pointer'}`}
                                             >
                                                  {loading ? (
                                                       <>
                                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                            Submitting...
                                                       </>
                                                  ) : (
                                                       <>
                                                            Submit
                                                            <HiOutlineArrowLongRight size={20} />
                                                       </>
                                                  )}
                                             </button>
                                        </div>
                                   </>
                              ) : (
                                   <>
                                        {/* OTP Verification Step */}
                                        <div className="bg-orange-50 p-4 rounded-lg mb-4 border border-orange-200">
                                             <p className="text-sm text-dark-black mb-1 font-medium">
                                                  ✓ OTP sent to <span className="text-cust-orange">{formData.email}</span>
                                             </p>
                                             <p className="text-xs text-gray-600">
                                                  Enter the 6-digit verification code sent to your email
                                             </p>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                             <label htmlFor="otp" className="text-[12px] md:text-[14px] text-dark-black font-medium">
                                                  OTP Code <span className="text-cust-orange">*</span>
                                             </label>
                                             <input
                                                  id="otp"
                                                  type="text"
                                                  name="otp"
                                                  value={formData.otp}
                                                  onChange={handleChange}
                                                  placeholder="Enter 6-digit OTP"
                                                  maxLength={6}
                                                  className={`w-full mt-1 h-10 bg-white border px-3 text-sm outline-none rounded-sm focus:ring-2 focus:ring-cust-orange ${errors.otp ? "border-red-500" : "border-dark-black/12"}`}
                                             />
                                             {errors.otp && (
                                                  <p className="text-red-500 text-xs mt-1" role="alert">
                                                       {errors.otp}
                                                  </p>
                                             )}
                                        </div>

                                        {/* Resend OTP & Edit Details */}
                                        <div className="flex justify-between items-center mt-4">
                                             <button
                                                  type="button"
                                                  onClick={handleResendOTP}
                                                  disabled={resendTimer > 0 || loading}
                                                  className={`text-sm ${resendTimer > 0 || loading ? "text-gray-400 cursor-not-allowed" : "text-cust-orange hover:underline cursor-pointer"}`}
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

                                        {/* Submit Button */}
                                        <div className="flex flex-col items-center mt-6">
                                             <button
                                                  type="submit"
                                                  disabled={status === "loading"}
                                                  className={`text-white px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${status === "loading"
                                                       ? "bg-cust-orange/60 cursor-not-allowed"
                                                       : status === "success"
                                                            ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                                                            : status === "error" || status === "timeout"
                                                                 ? "bg-red-500 hover:bg-red-600 cursor-pointer"
                                                                 : "bg-cust-orange hover:bg-cust-orange/90 hover:scale-105 cursor-pointer"
                                                       }`}
                                             >
                                                  {status === "idle" && (
                                                       <>
                                                            Verify & Submit
                                                            <HiOutlineArrowLongRight size={20} />
                                                       </>
                                                  )}
                                                  {status === "loading" && " Verifying..."}
                                                  {status === "success" && "✓ Submitted Successfully"}
                                                  {(status === "error" || status === "timeout") && (
                                                       <span
                                                            onClick={(e) => {
                                                                 e.stopPropagation();
                                                                 setStatus("idle");
                                                            }}
                                                            onKeyDown={(e) => {
                                                                 if (e.key === "Enter" || e.key === " ") {
                                                                      e.preventDefault();
                                                                      setStatus("idle");
                                                                 }
                                                            }}
                                                            tabIndex={0}
                                                            role="button"
                                                       >
                                                            {status === "error" ? "❌ Failed. Try Again" : "⏱️ Timed Out. Try Again"}
                                                       </span>
                                                  )}
                                             </button>

                                             {/* Live region for screen readers */}
                                             <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                                                  {loading && "Sending OTP..."}
                                                  {status === "loading" && "Verifying OTP..."}
                                                  {status === "success" && "Form submitted successfully!"}
                                                  {(status === "error" || status === "timeout") && "Submission failed. Please try again."}
                                             </div>
                                        </div>
                                   </>
                              )}
                         </form>
                    </div>

                    {/* Contact Card */}
                    <div className="mt-16 bg-white/80 backdrop-blur-md shadow-lg rounded-lg p-6 md:p-10 relative overflow-hidden">
                         <img
                              src={shakingHand}
                              alt='Shaking Hand Bg'
                              className="absolute inset-0 w-full h-full object-cover opacity-20 filter mix-blend-hard-light scale-110"
                         />
                         <h3 className="text-[20px] md:text-[36px] lg:text-[40px] font-medium md:font-normal text-dark-black mb-6">
                              {h3Contact.contact_heading_3 || "Other ways to get in touch with us"}
                         </h3>

                         <div className="space-y-6 text-dark-black">
                              <div>
                                   <p className="text-[12px] md:text-[14px] lg:text-[18px] text-dark-gray">mail us at</p>
                                   <p className="text-[16px] md:text-[18px] lg:text-[24px] font-medium">
                                        business@kreeyadesign.com
                                   </p>
                              </div>

                              <div>
                                   <p className="text-[12px] md:text-[14px] lg:text-[18px] text-dark-gray">Call us at</p>
                                   <p className="text-[16px] md:text-[18px] lg:text-[24px] font-medium">
                                        9311500423
                                   </p>
                              </div>

                              <div>
                                   <p className="text-[12px] md:text-[14px] lg:text-[18px] text-dark-gray">Join us at</p>
                                   <p className="text-[16px] md:text-[18px] lg:text-[24px] font-medium">
                                        Noida <br />
                                        Spingboard <br />
                                        D Block, Sector 2, Noida,<br />
                                        Uttar Pradesh 201301
                                   </p>
                              </div>
                         </div>
                    </div>
               </div>

               {/* <Suspense fallback={<div className="min-h-40" />}>
                    <Details />
               </Suspense> */}
               <Suspense fallback={<div className="min-h-40" />}>
                    <YouMayLike />
                    <div className="mt-10 md:mt-20">
                         <FaqSection faqData={faqData} />
                    </div>
               </Suspense>
          </section>
     );
};

export default ContactUs;