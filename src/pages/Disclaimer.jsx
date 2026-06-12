import { lazy, Suspense, useEffect } from "react";
import BgImage from "../assets/bg.webp";
// import SeoTags from '../components/SeoTags';
import { useH1Data } from "../hooks/useH1Data";
import useFaq from "../hooks/useFaq";

// const HomeNavbar = lazy(() => import('../components/HomeNavbar'));
const HomeNavbarV2 = lazy(() => import('../components/HomeNavbarV2'));
const Breadcrumb = lazy(() => import('../components/Breadcrumb'))
const FaqSection = lazy(() => import('../components/FaqSection'))
const YouMayLike = lazy(() => import('../components/YouMayLike'))

const Disclaimer = () => {
     const h1Disclaimer = useH1Data();
     const { faqData } = useFaq();
     useEffect(() => {
          window.scrollTo({
               top: 0,
               behavior: "smooth"
          });
     }, []);
     return (
          <section
               style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${BgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
               }}
               className="relative px-4 md:px-15 lg:px-20 2xl:px-30 py-20 text-[#8a8a8a]"
          >
               {/* <SeoTags
                    title="Disclaimer | Kreeya Design"
                    description="Review Kreeya Design's disclaimer for legal terms, site usage, and intellectual property information related to our creative and design services."
                    keywords="disclaimer, legal terms, website disclaimer, Kreeya Design legal notice, design agency disclaimer"
                    canonical="https://kreeyadesign.com/disclaimer"
               /> */}
               <Suspense fallback={null}>
                    {/* <HomeNavbar /> */}
                    <HomeNavbarV2 />
               </Suspense>
               <Suspense fallback={null}>
                    <Breadcrumb />
               </Suspense>

               {/* title */}
               <h1 className="relative text-center leading-12 md:leading-15 lg:leading-21 2xl:leading-27.75 text-[36px] md:text-[56px] lg:text-[72px] 2xl:text-[96px] mb-6 md:mb-12 z-20 text-dark-black poiret-one-regular mt-20 md:mt-16">
                    {h1Disclaimer.main_heading || 'Disclaimer'}
               </h1>

               {/* content */}
               <div className="relative mx-auto leading-relaxed space-y-10 plus-jakarta-sans z-20 text-[12px] md:text-[16px] lg:text-[18px] mb-10">

                    {/* 1 */}
                    <div>
                         <h2 className="font-bold text-[16px] md:text-[18px] lg:text-[20px] mb-3 text-dark-black">1. Who We Are</h2>

                         <p>
                              Kreeya Design (“we”, “us”, “our”) is a UI UX design agency providing digital design and consulting services to clients worldwide.
                         </p>

                         <p className="">
                              For data protection purposes, we act as the Data Controller for personal information collected through our website and during communication with potential or existing clients. This notice explains how we collect, use, and safeguard personal data, and outlines the rights available to you under applicable laws, including GDPR where relevant.
                         </p>

                         <p className="mt-4">
                              You may contact us at:
                         </p>

                         <a
                              href="mailto:support@kreeyadesign.com"
                              className="font-bold"
                         >
                              support@kreeyadesign.com
                         </a>
                    </div>

                    {/* 2 */}

                    <div>
                         <h2 className="font-bold text-[16px] md:text-[18px] lg:text-[20px] mb-3 text-dark-black">
                              2. Personal Data We Collect
                         </h2>

                         <p>
                              We collect the minimum information necessary to operate our website, communicate with visitors, and deliver our services.
                         </p>

                         <p className="mt-4 font-bold">Data you provide directly</p>

                         <ul className="list-disc pl-6 mt-2 space-y-1">
                              <li>Name</li>
                              <li>Email address</li>
                              <li>Phone number</li>
                              <li>Company or project details voluntarily shared</li>
                              <li>
                                   Any information included in a message, inquiry, or consultation request
                              </li>
                         </ul>

                         <p className="mt-6 font-bold">Data collected automatically</p>

                         <p className="mt-2">
                              When you visit our website, standard analytics and advertising tools may collect:
                         </p>

                         <ul className="list-disc pl-6 mt-2 space-y-1">
                              <li>Browser and device information</li>
                              <li>Pages viewed and on-site interactions</li>
                              <li>Approximate geographic region (non-precise)</li>
                              <li>Session duration and general usage behaviour</li>
                              <li>Traffic source (for example, an ad click or referral link)</li>
                         </ul>

                         <p className="mt-3">
                              This information helps us understand site performance and marketing effectiveness.
                              It does not directly identify individuals.
                         </p>

                         <p className="mt-6 font-bold">Potential future tools</p>

                         <p className="mt-2">
                              We may introduce behaviour insights tools (such as heatmaps, scroll depth,
                              or engagement metrics) solely to improve user experience.
                         </p>

                         <p className="mt-2">
                              These tools capture interaction patterns but are not used to identify users.<br />
                              We do not intentionally collect sensitive personal data.
                         </p>
                    </div>

                    {/* 3 */}

                    <div>
                         <h2 className="font-bold text-[16px] md:text-[18px] lg:text-[20px] mb-3 text-dark-black">
                              3. How We Collect Personal Data
                         </h2>

                         <p>We collect information through:</p>

                         <ul className="list-disc pl-6 mt-2 space-y-1">
                              <li>Contact forms</li>
                              <li>Email communication</li>
                              <li>Basic analytics services</li>
                              <li>Advertising performance and measurement tools</li>
                              <li>
                                   Optional user-experience insights platforms (only if adopted)
                              </li>
                         </ul>
                    </div>

                    {/* 4 */}

                    <div>
                         <h2 className="font-bold text-[16px] md:text-[18px] lg:text-[20px] mb-3 text-dark-black">
                              4. How We Use Personal Data
                         </h2>

                         <p>
                              We process personal data only for purposes aligned with your expectations
                              and our business operations.
                         </p>

                         <p className="mt-3">We use data to:</p>

                         <ul className="list-disc pl-6 mt-2 space-y-1">
                              <li>Respond to inquiries and communicate with potential or current clients</li>
                              <li>Assess project suitability and arrange consultations</li>
                              <li>Improve website performance and user experience</li>
                              <li>Analyse marketing performance and optimise advertising</li>
                              <li>Maintain website security and prevent misuse</li>
                         </ul>

                         <p className="mt-3">
                              We do not sell personal data or use it for unrelated purposes.
                         </p>
                    </div>

                    {/* 5 */}

                    <div>
                         <h2 className="font-bold text-[16px] md:text-[18px] lg:text-[20px] mb-3 text-dark-black">
                              5. Legal Basis for Processing (Applicable to UK/EU Visitors)
                         </h2>

                         <p className="font-bold">Legitimate Interests</p>

                         <ul className="list-disc pl-6 mt-2 space-y-1">
                              <li>Responding to inquiries</li>
                              <li>Operating and improving our website</li>
                              <li>Ensuring service security</li>
                              <li>Communicating with prospective and existing clients</li>
                         </ul>

                         <p className="mt-4 font-bold">Consent</p>

                         <ul className="list-disc pl-6 mt-2 space-y-1">
                              <li>Analytics and marketing cookies</li>
                              <li>Optional behavioural-insight tools (if enabled)</li>
                              <li>Any marketing communication you explicitly agree to receive</li>
                         </ul>

                         <p className="mt-3">
                              Consent can be withdrawn at any time through browser settings or
                              by contacting us.
                         </p>
                    </div>

                    {/* 6 */}
                    <div>
                         <h2 className="font-bold text-dark-black text-[16px] md:text-[18px] lg:text-[20px] mb-3">
                              6. Your Rights
                         </h2>
                         <p>Depending on your location, you may have the right to:</p>
                         <ul className="list-disc pl-6 space-y-1">
                              <li>Request access to your personal data</li>
                              <li>Request correction of inaccurate information</li>
                              <li>Request deletion of your data</li>
                              <li>Withdraw consent (where processing is based on consent)</li>
                              <li>Request information about our processing activities</li>
                              <li>Object to certain processing activities</li>
                         </ul>

                         <p className="mt-3">Before responding to a rights request, we may verify your identity to protect your data.</p>
                         <p className="">
                              Send requests to:
                              <a href="mailto:support@kreeyadesign.com" className="font-bold ml-1">
                                   support@kreeyadesign.com
                              </a>
                         </p>
                    </div>

                    {/* 7 */}
                    <div>
                         <h2 className="font-bold text-dark-black text-[16px] md:text-[18px] lg:text-[20px] mb-3">
                              7. Sharing and Disclosure of Personal Data
                         </h2>

                         <p>We disclose personal data only when necessary and only in the following situations:</p>
                         <ul className="list-disc pl-6 space-y-1">
                              <li>To service providers that assist with website operation, analytics, communication, or advertising measurement</li>
                              <li>When required by law or regulatory authorities</li>
                              <li>When necessary to safeguard our services or legal rights</li>
                         </ul>
                         <p className="mt-3">Service providers process data under confidentiality obligations and cannot use the information for their own independent purposes. We do not list operational vendors publicly for security reasons.</p>
                    </div>

                    {/* 8 */}
                    <div>
                         <h2 className="font-bold text-dark-black text-[16px] md:text-[18px] lg:text-[20px] mb-3">
                              8. Safeguarding Measures
                         </h2>
                         <p>We take reasonable and industry-appropriate steps to secure personal data, including:</p>
                         <ul className="list-disc pl-6 space-y-1">
                              <li>Controlled access to business communication channels</li>
                              <li>Secure transmission practices (such as encrypted connections where applicable)</li>
                              <li>Internal processes to reduce unauthorised access or misuse</li>
                              <li> Regular review of systems and website security posture</li>
                         </ul>
                         <p className="mt-3">No online service is entirely risk-free, but we take protective measures suitable for a professional design agency.</p>
                    </div>

                    {/* 9 */}
                    <div>
                         <h2 className="font-bold text-dark-black text-[16px] md:text-[18px] lg:text-[20px] mb-3">
                              9. Consequences of Not Providing Data
                         </h2>

                         <p>
                              If you choose not to provide information such as your name, email, or project details, we may be unable to respond to your inquiry or evaluate your request for services.
                         </p>
                    </div>

                    {/* 10 */}
                    <div>
                         <h2 className="font-bold text-dark-black text-[16px] md:text-[18px] lg:text-[20px] mb-3">
                              10. Data Retention
                         </h2>

                         <p>
                              We retain personal data only for as long as reasonably necessary for:
                         </p>
                         <ul className="list-disc pl-6 space-y-1">
                              <li>Communication and consultation</li>
                              <li>Potential or active business discussions</li>
                              <li>Legal or administrative requirements</li>
                         </ul>
                         <p>Analytics and advertising data follow the retention settings of their respective platforms.</p>
                         <p>If you request deletion of your data, we will review and comply unless legal or operational requirements require limited retention.</p>
                    </div>

                    {/* 11 */}
                    <div>
                         <h2 className="font-bold text-dark-black text-[16px] md:text-[18px] lg:text-[20px] mb-3">
                              11. International Processing
                         </h2>

                         <p>
                              Because we work with clients and service providers globally, personal data may be processed across borders.
                         </p>
                         <p>We take reasonable steps to ensure that processing is lawful and appropriately safeguarded.</p>
                    </div>

                    {/* 12 */}
                    <div>
                         <h2 className="font-bold text-dark-black text-[16px] md:text-[18px] lg:text-[20px] mb-3">
                              12. Updates to This Policy
                         </h2>

                         <p>
                              We may update this Privacy Policy as our website, services, or legal obligations evolve.
                         </p>
                         <p>The “Last Updated” date will reflect the latest version.</p>
                         <p>Continued use of our website indicates acceptance of any changes.</p>
                    </div>

                    {/* 13 */}
                    <div>
                         <h2 className="font-bold text-dark-black text-[16px] md:text-[18px] lg:text-[20px] mb-3">
                              13. Contact Us
                         </h2>

                         <p>
                              For questions, data requests, or concerns related to privacy, contact:
                         </p>

                         <a
                              href="mailto:support@kreeyadesign.com"
                              className="font-bold"
                         >
                              support@kreeyadesign.com
                         </a>
                    </div>

               </div>

               <Suspense fallback={<div className="min-h-40" />}>
                    <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}>
                         <YouMayLike />
                         <div className="mt-10 md:mt-20">
                              <FaqSection faqData={faqData} />
                         </div>
                    </div>
               </Suspense>

          </section >
     );
};

export default Disclaimer;