// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // استدعاء الراوتر
// import AOS from 'aos'; // 1. استيراد المكتبة
// import 'aos/dist/aos.css'; // 2. استيراد تنسيقات المكتبة CSS
// import Navbar from './components/layout/Navbar';
// import Hero from './components/sections/Hero';
// import DoctorSection from './components/sections/DoctorSection'; 
// import Features from './components/sections/Features';
// import JourneyTimeline from './components/sections/JourneyTimeline'; 
// import RecoveryStories from './components/sections/RecoveryStories';
// import Footer from './components/layout/Footer';
// import LoginPage from './pages/LoginPage'; // استيراد الصفحة الجديدة
// import ForgotPassword from './pages/ForgotPassword';
// import VerifyCode from './pages/VerifyCode';
// import ResetPassword from './pages/ResetPassword';
// import PasswordChanged from './pages/PasswordChanged';
// export default function PulseXApp() {
    
//     // 3. تهيئة AOS عند تحميل المكون
//     useEffect(() => {
//         AOS.init({
//             duration: 1000,
//             once: true, 
//         });
//         // هذا السطر مهم إذا كانت المحتويات تتغير ديناميكيًا
//         AOS.refresh(); 
//     }, []);
// // دي الصفحة الرئيسية (مجمعة كل السكاشن)
// const Home = () => (
//   <>
//     <Navbar />
//     <main>
//       <Hero />
//       <DoctorSection />
//       <Features />
//       <RecoveryStories />
//       <JourneyTimeline /> 
//     </main>
//     <Footer />
//   </>
// );

// export default function PulseXApp() {
//   return (
//     // لازم كل التطبيق يكون جوه Router
//     <Router>
//       <div className="font-sans text-slate-900 antialiased bg-white">
//         <Routes>
//           {/* المسار الرئيسي */}
//           <Route path="/" element={<Home />} />
          
//           {/* مسار اللوجين (صفحة مستقلة من غير ناف بار وفوتر) */}
//           {/* */}


//               <Route path="/" element={<Home />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/verify-code" element={<VerifyCode />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route path="/password-changed" element={<PasswordChanged />} />
//           </Routes> 
//       </div>
//     </Router>
//   );
// }

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import DoctorSection from './components/sections/DoctorSection'; 
import Features from './components/sections/Features';
import JourneyTimeline from './components/sections/JourneyTimeline'; 
import RecoveryStories from './components/sections/RecoveryStories';

import LoginPage from './pages/LoginPage';
import ForgotPassword from './pages/ForgotPassword';
import VerifyCode from './pages/VerifyCode';
import ResetPassword from './pages/ResetPassword';
import PasswordChanged from './pages/PasswordChanged';

const Home = () => (
    <main>
        <Navbar />
        <Hero />
        <DoctorSection />
        <Features />
        <RecoveryStories />
        <JourneyTimeline /> 
        <Footer />
    </main>
);

export default function PulseXApp() { 
    
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true, 
        });
        AOS.refresh(); 
    }, []);

    return (
        // تم إضافة basename هنا عشان الراوتر يفهم رابط جيت هب
        <Router basename="/GP.2.1">
            <div className="font-sans text-slate-900 antialiased bg-white">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/verify-code" element={<VerifyCode />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/password-changed" element={<PasswordChanged />} />
                </Routes>
            </div>
        </Router>
    );
}