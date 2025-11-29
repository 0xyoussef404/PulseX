// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ResetPassword = () => {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!password || !confirmPassword) {
//       setError("All fields are required");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     // --- التعديل هنا: التوجيه لصفحة النجاح ---
//     console.log("Password changed successfully!");
//     navigate('/password-changed'); 
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4 font-sans">
//       <div className="w-full max-w-[400px] flex flex-col">
        
//         <div className="mb-10 text-center">
//            <span className="text-[#010218] text-3xl font-bold font-['Poppins']">Pulse</span>
//            <span className="text-[#333CF5] text-3xl font-bold font-['Poppins']">X</span>
//         </div>

//         <div className="mb-8">
//             <h2 className="text-[#010218] text-[24px] font-medium font-['Inter'] mb-3 tracking-wide">New Password</h2>
//             <p className="text-[#757575] text-[16px] font-normal font-['Roboto'] leading-6">
//                 Set the new password for your account so you can login and access all features.
//             </p>
//         </div>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
//             <div className="flex flex-col gap-1">
//                 <input 
//                     type="password" 
//                     placeholder="New Password"
//                     value={password}
//                     onChange={(e) => {
//                         setPassword(e.target.value);
//                         setError('');
//                     }}
//                     className={`w-full h-[50px] px-5 rounded-[24px] bg-white border outline-none transition-all text-sm text-[#010218] placeholder:text-gray-400 shadow-sm
//                     ${error && !password 
//                         ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
//                         : 'border-gray-200 focus:border-[#333CF5] focus:ring-1 focus:ring-[#333CF5]'
//                     }`}
//                 />
//             </div>

//             <div className="flex flex-col gap-1">
//                 <input 
//                     type="password" 
//                     placeholder="Confirm Password"
//                     value={confirmPassword}
//                     onChange={(e) => {
//                         setConfirmPassword(e.target.value);
//                         setError('');
//                     }}
//                     className={`w-full h-[50px] px-5 rounded-[24px] bg-white border outline-none transition-all text-sm text-[#010218] placeholder:text-gray-400 shadow-sm
//                     ${error 
//                         ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
//                         : 'border-gray-200 focus:border-[#333CF5] focus:ring-1 focus:ring-[#333CF5]'
//                     }`}
//                 />
//                 {error && <span className="text-xs text-red-500 ml-2 mt-1">{error}</span>}
//             </div>

//             <button 
//                 type="submit"
//                 className="w-full h-[50px] bg-[#333CF5] text-white rounded-[24px] text-sm font-medium hover:bg-[#282eb5] transition-colors shadow-md mt-4 font-['Inter']"
//             >
//                 Change Password
//             </button>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; 

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    console.log("Password changed successfully!");
    navigate('/password-changed'); 
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center font-['Inter'] overflow-hidden">
      
      <style>{`
        input::-ms-reveal,
        input::-ms-clear {
          display: none;
        }
      `}</style>

      <div className="w-96 flex flex-col justify-start items-start gap-6 relative">
        
        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          <div className="self-stretch justify-start items-center inline-flex">
            <span className="text-[#010218] text-3xl font-semibold font-['Inter']">Pulse</span>
            <span className="text-[#333CF5] text-3xl font-semibold font-['Inter']">X</span>
          </div>
          
          <div className="self-stretch flex flex-col justify-start items-start gap-3">
            <div className="self-stretch justify-start text-[#010218] text-2xl font-medium font-['Inter'] leading-8 tracking-wide">
              New Password
            </div>
            <div className="self-stretch justify-start text-[#757575] text-base font-normal font-['Inter'] leading-6">
              Set the new password for your account so you can login and access all features.
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="self-stretch flex flex-col justify-start items-start gap-4 w-full">
            
            <div className="self-stretch flex flex-col justify-start items-start gap-3 w-full">
                
                <div className={`relative w-full px-4 py-3 bg-white rounded-3xl outline outline-1 outline-offset-[-1px] ${error && !password ? 'outline-red-500' : 'outline-neutral-500/40'} focus-within:outline-[#333CF5] focus-within:outline-2 inline-flex justify-between items-center transition-all`}>
                    <input 
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                        className="w-full bg-transparent border-none outline-none text-[#010218] text-sm font-normal font-['Inter'] pr-8"
                    />
                    {password.length > 0 && (
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 text-[#010218] flex items-center justify-center cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
                </div>

                <div className={`relative w-full px-4 py-3 bg-white rounded-3xl outline outline-1 outline-offset-[-1px] ${error ? 'outline-red-500' : 'outline-neutral-500/40'} focus-within:outline-[#333CF5] focus-within:outline-2 inline-flex justify-between items-center transition-all`}>
                    <input 
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setError('');
                        }}
                        className="w-full bg-transparent border-none outline-none text-[#010218] text-sm font-normal font-['Inter'] pr-8"
                    />
                    {confirmPassword.length > 0 && (
                        <button 
                            type="button" 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 text-[#010218] flex items-center justify-center cursor-pointer"
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
                </div>
                
                {error && <span className="text-xs text-red-500 ml-4">{error}</span>}
            </div>

            <button 
                type="submit" 
                className="self-stretch h-12 px-4 py-3 bg-[#333CF5] hover:bg-[#282eb5] rounded-3xl inline-flex justify-center items-center gap-2.5 transition-colors shadow-sm"
            >
                <div className="text-center text-white text-sm font-medium font-['Inter']">Change Password</div>
            </button>

        </form>
      </div>
    </div>
  );
};

export default ResetPassword;