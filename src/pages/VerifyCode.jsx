// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

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

//     // الانتقال لصفحة كلمة المرور الجديدة
//     console.log("Verified Code:", code);
//     navigate('/reset-password'); 
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4 font-sans">
      
//       <div className="w-full max-w-[400px] flex flex-col items-center">
        
//         <div className="mb-8 text-center">
//            <span className="text-[#010218] text-3xl font-bold font-['Poppins']">Pulse</span>
//            <span className="text-[#333CF5] text-3xl font-bold font-['Poppins']">X</span>
//         </div>

//         <div className="w-full flex flex-col gap-6">
            
//             <div className="text-start">
//                 <h2 className="text-[#010218] text-2xl font-medium font-['Inter'] mb-3 tracking-wide">Verification</h2>
//                 <p className="text-[#757575] text-base font-normal font-['Roboto'] leading-6">
//                     Enter your 4 digits code that you received on your email.
//                 </p>
//             </div>

//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
//                 <div className="flex flex-col gap-1">
//                     <input 
//                         type="text" 
//                         maxLength="4"
//                         placeholder="0000"
//                         value={code}
//                         onChange={(e) => {
//                             const val = e.target.value.replace(/\D/g, '');
//                             setCode(val);
//                             setError('');
//                         }}
//                         className={`w-full h-[50px] px-4 rounded-[24px] bg-white border outline-none transition-all text-center text-lg tracking-[10px] font-medium text-[#010218] placeholder:tracking-normal shadow-sm
//                         ${error 
//                             ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
//                             : 'border-gray-200 focus:border-[#333CF5] focus:ring-1 focus:ring-[#333CF5]'
//                         }`}
//                     />
//                     {error && <span className="text-xs text-red-500 text-center mt-1">{error}</span>}
//                 </div>

//                 <button 
//                     type="submit"
//                     className="w-full h-[50px] bg-[#333CF5] text-white rounded-[24px] text-sm font-medium hover:bg-[#282eb5] transition-colors shadow-md mt-2 font-['Inter']"
//                 >
//                     Verify
//                 </button>

//             </form>

//             <div className="flex justify-center">
//                 <button 
//                     onClick={() => alert("Code resent!")}
//                     className="text-sm text-[#333CF5] hover:underline font-medium transition-colors font-['Inter']"
//                 >
//                     Resend email
//                 </button>
//             </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyCode;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (code.length !== 4) {
      setError("Please enter a valid 4-digit code");
      return;
    }

    console.log("Verified Code:", code);
    navigate('/reset-password'); 
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center font-['Inter'] overflow-hidden">
      
      <div className="w-96 flex flex-col justify-start items-start gap-6 relative">
        
        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          
          <div className="self-stretch justify-start items-center inline-flex">
            <span className="text-[#010218] text-3xl font-semibold font-['Inter']">Pulse</span>
            <span className="text-[#333CF5] text-3xl font-semibold font-['Inter']">X</span>
          </div>
          
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch justify-start text-[#010218] text-2xl font-medium font-['Inter'] leading-8 tracking-wide">
              Verification
            </div>
            
            <div className="self-stretch justify-start text-[#757575] text-base font-normal font-['Inter'] leading-6 tracking-tight">
              Enter your 4 digits code that you received on your email
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="self-stretch flex flex-col justify-start items-start gap-3 w-full">
            
            <div className="self-stretch flex flex-col justify-start items-center gap-4 w-full">
              <div className={`w-full px-4 py-3 bg-slate-50 rounded-3xl outline outline-1 outline-offset-[-1px] ${error ? 'outline-red-500' : 'outline-neutral-500/40'} focus-within:outline-[#333CF5] focus-within:outline-2 inline-flex justify-start items-center gap-2.5 transition-all`}>
                <input 
                  type="text" 
                  maxLength="4"
                  placeholder="" 
                  value={code}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setCode(val);
                    setError('');
                  }}
                  className="w-full bg-transparent border-none outline-none text-[#010218] text-lg font-medium tracking-[0.5em] text-left font-['Inter'] h-6"
                />
              </div>
              {error && <span className="text-xs text-red-500 self-start ml-4">{error}</span>}
            </div>

            <div className="self-stretch flex flex-col justify-center items-center gap-3 w-full mt-1">
              
              <button 
                type="submit" 
                className="self-stretch h-12 px-4 py-3 bg-[#333CF5] hover:bg-[#282eb5] rounded-3xl inline-flex justify-center items-center gap-2.5 transition-colors"
              >
                <div className="text-center text-white text-sm font-medium font-['Inter']">Verify</div>
              </button>
              
              <div className="w-24 h-4 relative flex justify-center items-center cursor-pointer mt-1" onClick={() => alert("Code resent!")}>
                <div className="text-[#333CF5] text-sm font-normal font-['Inter'] hover:underline whitespace-nowrap">Resend email</div>
              </div>

            </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;