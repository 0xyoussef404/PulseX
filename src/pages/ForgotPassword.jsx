// import React, { useState } from 'react';
// import { ArrowLeft } from 'lucide-react';

// // محاكاة لـ useNavigate و Link لأننا في بيئة معاينة (Preview)
// // في مشروعك الحقيقي، استخدمي: import { useNavigate, Link } from 'react-router-dom';
// const Link = ({ to, children, className }) => <a href={to} className={className}>{children}</a>;

// export default function App() {
//   // --- Logic State (نفس الكود الخاص بك) ---
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
  
//   // محاكاة للدالة navigate
//   const navigate = (path) => {
//     console.log(`Navigating to: ${path}`);
//     alert(`Success! Email sent to ${email}. Navigating to ${path}`);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // 1. التحقق من الإيميل
//     if (!email) {
//       setError("Email is required");
//       return;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     // 2. لو كله تمام
//     console.log("Sending code to:", email);
//     navigate('/verify-code'); 
//   };

//   return (
//     // الخلفية العامة للصفحة - مطابقة لـ Figma (bg-gray-50)
//     <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center font-['Inter']">
      
//       {/* Card Container 
//          الأبعاد من Figma: w-96 (384px)
//          المسافات: gap-6
//       */}
//       <div className="w-96 flex flex-col justify-start items-start gap-6">
        
//         {/* --- 1. Logo Section --- */}
//         {/* Figma: Text-3xl, Font-SemiBold */}
//         <div className="self-stretch justify-start items-center inline-flex">
//           <span className="text-[#010218] text-3xl font-semibold">Pulse</span>
//           <span className="text-[#333CF5] text-3xl font-semibold">X</span>
//         </div>

//         {/* --- 2. Text Section --- */}
//         <div className="self-stretch flex flex-col justify-start items-start gap-6">
          
//           <div className="self-stretch flex flex-col justify-start items-start gap-3">
//             {/* Headline: Text-2xl, Font-Medium, Leading-8 */}
//             <div className="self-stretch text-[#010218] text-2xl font-medium leading-8 tracking-wide">
//               Forget password
//             </div>
            
//             {/* Paragraph: Text-base, Font-Normal, Leading-6, Color Neutral-500 (#757575) */}
//             <div className="self-stretch text-[#757575] text-base font-normal leading-6 tracking-tight">
//               Enter your email for the verification process, we will send 4 digits code to your email.
//             </div>
//           </div>

//           {/* --- 3. Form Section (Inputs & Button) --- */}
//           {/* Figma Group: InputAndButton gap-4 */}
//           <form onSubmit={handleSubmit} className="self-stretch flex flex-col justify-start items-start gap-4">
            
//             {/* Email Input Wrapper */}
//             <div className="w-full">
//               {/* Input Styling matching Figma:
//                   - px-4 py-3 (h-auto or standard padding)
//                   - bg-slate-50 (Very light gray)
//                   - rounded-3xl (Full rounded corners)
//                   - Outline/Border logic
//               */}
//               <div className={`relative w-full px-4 py-3 bg-slate-50 rounded-3xl border ${error ? 'border-red-500' : 'border-neutral-200'} focus-within:border-[#333CF5] focus-within:ring-1 focus-within:ring-[#333CF5] transition-all`}>
//                 <input 
//                   type="email" 
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => {
//                     setEmail(e.target.value);
//                     setError('');
//                   }}
//                   className="w-full bg-transparent outline-none text-[#010218] placeholder-[#757575] text-sm font-normal"
//                 />
//               </div>
//               {/* Error Message */}
//               {error && <span className="text-xs text-red-500 ml-4 mt-1 block">{error}</span>}
//             </div>

//             {/* Submit Button */}
//             {/* Figma: 
//                 - bg-Blue-1 (#333CF5)
//                 - rounded-3xl
//                 - px-4 py-3
//             */}
//             <button 
//               type="submit"
//               className="self-stretch px-4 py-3 bg-[#333CF5] hover:bg-[#282eb5] rounded-3xl justify-center items-center inline-flex transition-colors"
//             >
//               <div className="text-center text-white text-sm font-medium">Continue</div>
//             </button>

//           </form>
          
//           {/* Back to Login (Optional - kept from your original code style but simplified) */}
//           {/* <div className="self-stretch flex justify-center pt-2">
//             <Link to="/login" className="flex items-center gap-2 text-sm text-[#757575] hover:text-[#333CF5] transition-colors font-medium">
//                 <ArrowLeft className="w-4 h-4" />
//                 Back to Login
//             </Link>
//           </div> */}

//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, createContext, useContext } from 'react';

// // ===================================================================
// // ⚠️ ملاحظة: في مشروعك الحقيقي، كل دالة من دول هتكون في ملف منفصل
// // ForgotPassword.jsx و VerifyCode.jsx
// // وهتستخدمي React Router (Routes & Route) للتنقل بينهم
// // ===================================================================

// // --- محاكاة للـ Router عشان المعاينة تشتغل هنا ---
// const RouterContext = createContext();
// const useNavigate = () => useContext(RouterContext);

// // 1️⃣ صفحة نسيان كلمة المرور (الكود اللي بعتيه + تعديل بسيط للربط)
// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // دي هتشغل الانتقال

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // 1. التحقق (Validation)
//     if (!email) {
//       setError("Email is required");
//       return;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     // 2. الانتقال للصفحة التالية
//     console.log("Sending code to:", email);
//     // هنا بنقوله روح لصفحة الكود
//     navigate('/verify-code'); 
//   };

//   return (
//     <div className="w-96 flex flex-col justify-start items-start gap-6">
//         {/* Logo */}
//         <div className="self-stretch justify-start items-center inline-flex">
//           <span className="text-[#010218] text-3xl font-semibold">Pulse</span>
//           <span className="text-[#333CF5] text-3xl font-semibold">X</span>
//         </div>

//         {/* Text */}
//         <div className="self-stretch flex flex-col justify-start items-start gap-6">
//           <div className="self-stretch flex flex-col justify-start items-start gap-3">
//             <div className="self-stretch text-[#010218] text-2xl font-medium leading-8 tracking-wide">
//               Forget password
//             </div>
//             <div className="self-stretch text-[#757575] text-base font-normal leading-6 tracking-tight">
//               Enter your email for the verification process, we will send 4 digits code to your email.
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="self-stretch flex flex-col justify-start items-start gap-4">
//             <div className="w-full">
//               <div className={`relative w-full px-4 py-3 bg-slate-50 rounded-3xl border ${error ? 'border-red-500' : 'border-neutral-200/60'} focus-within:border-[#333CF5] focus-within:ring-1 focus-within:ring-[#333CF5] transition-all`}>
//                 <input 
//                   type="email" 
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => { setEmail(e.target.value); setError(''); }}
//                   className="w-full bg-transparent outline-none text-[#010218] placeholder-[#757575] text-sm font-normal"
//                 />
//               </div>
//               {error && <span className="text-xs text-red-500 ml-4 mt-1 block">{error}</span>}
//             </div>

//             <button type="submit" className="self-stretch px-4 py-3 bg-[#333CF5] hover:bg-[#282eb5] rounded-3xl justify-center items-center inline-flex transition-colors shadow-sm">
//               <div className="text-center text-white text-sm font-medium">Continue</div>
//             </button>
//           </form>
//         </div>
//     </div>
//   );
// };

// // 2️⃣ صفحة التحقق (الصفحة اللي بعدها بتصميم فيجما)
// const VerifyCode = () => {
//   const [code, setCode] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (code.length !== 4) {
//       setError("Please enter a valid 4-digit code");
//       return;
//     }

//     // الانتقال لصفحة الريست
//     console.log("Verified Code:", code);
//     navigate('/reset-password'); 
//   };

//   return (
//     <div className="w-96 flex flex-col justify-start items-start gap-6">
//         <div className="self-stretch flex flex-col justify-start items-start gap-6">
//           {/* Logo */}
//           <div className="self-stretch justify-start items-center inline-flex">
//             <span className="text-[#010218] text-3xl font-semibold">Pulse</span>
//             <span className="text-[#333CF5] text-3xl font-semibold">X</span>
//           </div>
          
//           {/* Headlines */}
//           <div className="self-stretch flex flex-col justify-start items-start gap-3">
//             <div className="self-stretch justify-start text-[#010218] text-2xl font-medium leading-8 tracking-wide">
//               Verification
//             </div>
//             <div className="self-stretch justify-start text-[#757575] text-base font-normal font-['Roboto'] leading-6 tracking-tight">
//               Enter your 4 digits code that you received on your email
//             </div>
//           </div>
//         </div>

//         {/* Input Code Form */}
//         <form onSubmit={handleSubmit} className="self-stretch flex flex-col justify-start items-start gap-3 w-full">
//             <div className="self-stretch flex flex-col justify-start items-center gap-4 w-full">
//               <div className={`w-full px-4 py-3 bg-slate-50 rounded-3xl border ${error ? 'border-red-500' : 'border-neutral-200/60'} focus-within:border-[#333CF5] focus-within:ring-1 focus-within:ring-[#333CF5] inline-flex justify-start items-center gap-2.5 transition-all`}>
//                 <input 
//                   type="text" 
//                   maxLength="4"
//                   placeholder="0000"
//                   value={code}
//                   onChange={(e) => {
//                     const val = e.target.value.replace(/\D/g, '');
//                     setCode(val);
//                     setError('');
//                   }}
//                   className="w-full bg-transparent outline-none text-[#010218] placeholder-[#757575]/40 text-lg font-medium tracking-[0.5em] text-center"
//                 />
//               </div>
//               {error && <span className="text-xs text-red-500 self-start ml-4">{error}</span>}
//             </div>

//             <div className="self-stretch flex flex-col justify-center items-center gap-3 w-full mt-2">
//               <button type="submit" className="self-stretch h-12 px-4 py-3 bg-[#333CF5] hover:bg-[#282eb5] rounded-3xl inline-flex justify-center items-center gap-2.5 transition-colors shadow-sm">
//                 <div className="text-center justify-start text-white text-sm font-medium">Verify</div>
//               </button>
              
//               <button type="button" onClick={() => alert("Code resent!")} className="h-4 relative mt-1">
//                 <div className="text-[#333CF5] text-sm font-normal hover:underline">Resend email</div>
//               </button>
//             </div>
//         </form>
//     </div>
//   );
// };

// // 3️⃣ المكون الرئيسي اللي بيعرض الصفحات ويشغل التنقل
// export default function App() {
//   const [currentPath, setCurrentPath] = useState('/forgot-password');

//   // دالة التنقل
//   const navigate = (path) => {
//     setCurrentPath(path);
//     window.scrollTo(0,0);
//   };

//   return (
//     // الخلفية العامة وتحديد الخط Inter
//     <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center font-['Inter']">
//       <RouterContext.Provider value={navigate}>
        
//         {/* هنا بنبدل الصفحات بناء على المسار الحالي */}
//         {currentPath === '/forgot-password' && <ForgotPassword />}
//         {currentPath === '/verify-code' && <VerifyCode />}
        
//         {/* صفحة مؤقتة للي بعدها */}
//         {currentPath === '/reset-password' && (
//              <div className="w-96 text-center bg-white p-8 rounded-3xl shadow-sm">
//                 <h2 className="text-2xl font-bold text-[#010218] mb-2">Reset Password Page</h2>
//                 <p className="text-[#757575]">هنا هتيجي صفحة تغيير الباسورد</p>
//              </div>
//         )}

//       </RouterContext.Provider>
//     </div>
//   );
// }
// backe to login
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!email) {
//       setError("Email is required");
//       return;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setError("Please enter a valid email address");
//       return;
//     }

//     console.log("Sending code to:", email);
//     navigate('/verify-code'); 
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center font-['Inter']">
//       <div className="w-96 flex flex-col justify-start items-start gap-6">
//           {/* Logo Section */}
//           <div className="self-stretch justify-start items-center inline-flex">
//             <span className="text-[#010218] text-3xl font-semibold">Pulse</span>
//             <span className="text-[#333CF5] text-3xl font-semibold">X</span>
//           </div>

//           {/* Text Section */}
//           <div className="self-stretch flex flex-col justify-start items-start gap-6">
//             <div className="self-stretch flex flex-col justify-start items-start gap-3">
//               <div className="self-stretch text-[#010218] text-2xl font-medium leading-8 tracking-wide">
//                 Forget password
//               </div>
//               <div className="self-stretch text-[#757575] text-base font-normal leading-6 tracking-tight">
//                 Enter your email for the verification process, we will send 4 digits code to your email.
//               </div>
//             </div>

//             {/* Form Section */}
//             <form onSubmit={handleSubmit} className="self-stretch flex flex-col justify-start items-start gap-4">
//               <div className="w-full">
//                 <div className={`relative w-full px-4 py-3 bg-slate-50 rounded-3xl border ${error ? 'border-red-500' : 'border-neutral-200/60'} focus-within:border-[#333CF5]  transition-all`}>
//                   <input 
//                     type="email" 
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => { setEmail(e.target.value); setError(''); }}
//                     className="w-full bg-transparent outline-none text-[#010218] placeholder-[#757575] text-sm font-normal"
//                   />
//                 </div>
//                 {error && <span className="text-xs text-red-500 ml-4 mt-1 block">{error}</span>}
//               </div>

//               {/* Continue Button */}
//               <button type="submit" className="self-stretch px-4 py-3 bg-[#333CF5] hover:bg-[#282eb5] rounded-3xl justify-center items-center inline-flex transition-colors shadow-sm">
//                 <div className="text-center text-white text-sm font-medium">Continue</div>
//               </button>

//               {/* --- New Back to Login Button --- */}
//               <button 
//                 type="button" 
//                 onClick={() => navigate('/login')}
//                 className="self-stretch flex items-center justify-center gap-2 mt-2 group"
//               >
//                 {/* SVG Arrow Icon */}
//                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#757575] group-hover:text-[#333CF5] transition-colors">
//                     <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//                 <span className="text-[#757575] text-sm font-medium group-hover:text-[#333CF5] transition-colors">
//                     Back to Login
//                 </span>
//               </button>

//             </form>
//           </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    console.log("Sending code to:", email);
    navigate('/verify-code'); 
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center font-['Inter']">
      <div className="w-96 flex flex-col justify-start items-start gap-6">
          <div className="self-stretch justify-start items-center inline-flex">
            <span className="text-[#010218] text-3xl font-semibold">Pulse</span>
            <span className="text-[#333CF5] text-3xl font-semibold">X</span>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-6">
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
              <div className="self-stretch text-[#010218] text-2xl font-medium leading-8 tracking-wide">
                Forget password
              </div>
              <div className="self-stretch text-[#757575] text-base font-normal leading-6 tracking-tight">
                Enter your email for the verification process, we will send 4 digits code to your email.
              </div>
            </div>

   
            <form onSubmit={handleSubmit} className="self-stretch flex flex-col justify-start items-start gap-4">
              <div className="w-full">
                <div className={`relative w-full px-4 py-3 bg-slate-50 rounded-3xl border ${error ? 'border-red-500' : 'border-neutral-200/60'} focus-within:border-[#333CF5]  transition-all`}>
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    className="w-full bg-transparent outline-none text-[#010218] placeholder-[#757575] text-sm font-normal"
                  />
                </div>
                {error && <span className="text-xs text-red-500 ml-4 mt-1 block">{error}</span>}
              </div>

              <button type="submit" className="self-stretch px-4 py-3 bg-[#333CF5] hover:bg-[#282eb5] rounded-3xl justify-center items-center inline-flex transition-colors shadow-sm">
                <div className="text-center text-white text-sm font-medium">Continue</div>
              </button>
            </form>
          </div>
      </div>
    </div>
  );
};

export default ForgotPassword;