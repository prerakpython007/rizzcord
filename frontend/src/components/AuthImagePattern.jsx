const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;

// import { useState, useEffect } from 'react';

// const AuthImagePattern = ({ 
//   title = "Welcome to Messenger", 
//   subtitle = "The professional communication platform",
//   colorScheme = "primary"
// }) => {
//   const [animatingBubble, setAnimatingBubble] = useState(null);
//   const [animationPhase, setAnimationPhase] = useState(0);
  
//   // Professional color mapping
//   const colorMap = {
//     primary: {
//       sent: "bg-primary/15",
//       received: "bg-base-300/50",
//       accent: "bg-primary/30",
//       text: "text-primary"
//     },
//     secondary: {
//       sent: "bg-secondary/15",
//       received: "bg-base-300/50",
//       accent: "bg-secondary/30",
//       text: "text-secondary"
//     },
//     accent: {
//       sent: "bg-accent/15",
//       received: "bg-base-300/50",
//       accent: "bg-accent/30",
//       text: "text-accent"
//     },
//     info: {
//       sent: "bg-info/15",
//       received: "bg-base-300/50",
//       accent: "bg-info/30",
//       text: "text-info"
//     }
//   };

//   const colors = colorMap[colorScheme] || colorMap.primary;

//   // Define chat bubble configurations - more refined sizes for professional look
//   const chatBubbles = [
//     { sent: false, width: "w-24", height: "h-8" },
//     { sent: false, width: "w-32", height: "h-8" },
//     { sent: true, width: "w-28", height: "h-8" },
//     { sent: false, width: "w-36", height: "h-8" },
//     { sent: true, width: "w-32", height: "h-8" },
//     { sent: true, width: "w-24", height: "h-8" }
//   ];

//   // More elegant, sequential animation of chat bubbles
//   useEffect(() => {
//     // Sequential typing animation effect
//     const animateSequence = () => {
//       // Start from the beginning of the conversation
//       setAnimationPhase(1); // Start phase
      
//       // Select a random starting point (but more likely to start from earlier messages)
//       const startIndex = Math.floor(Math.random() * 4);
//       setAnimatingBubble(startIndex);
      
//       // Sequential animation timing
//       const timings = [
//         1000,  // First bubble appears
//         1200,  // Second bubble appears
//         1000,  // Pause before next
//         900    // Last bubble appears
//       ];
      
//       // Create a sequence where bubbles appear one after another
//       let totalDelay = 0;
      
//       // First bubble animation
//       setTimeout(() => {
//         setAnimatingBubble(startIndex);
//       }, totalDelay);
      
//       totalDelay += timings[0];
      
//       // Second bubble animation (only if we have room in the sequence)
//       if (startIndex < chatBubbles.length - 1) {
//         setTimeout(() => {
//           setAnimatingBubble(startIndex + 1);
//         }, totalDelay);
        
//         totalDelay += timings[1];
//       }
      
//       // Pause before next animation
//       setTimeout(() => {
//         setAnimatingBubble(null);
//       }, totalDelay);
      
//       totalDelay += timings[2];
      
//       // Final bubble animation (response bubble with opposite sent status)
//       const finalIndex = findOppositeStatusIndex(startIndex);
//       setTimeout(() => {
//         setAnimatingBubble(finalIndex);
//         setAnimationPhase(2); // End phase
//       }, totalDelay);
      
//       // End the animation sequence
//       setTimeout(() => {
//         setAnimatingBubble(null);
//         setAnimationPhase(0);
//       }, totalDelay + timings[3]);
//     };
    
//     // Find a bubble with the opposite sent status (for reply effect)
//     const findOppositeStatusIndex = (currentIndex) => {
//       const currentStatus = chatBubbles[currentIndex].sent;
//       const oppositeIndices = chatBubbles
//         .map((bubble, index) => bubble.sent !== currentStatus ? index : -1)
//         .filter(index => index !== -1);
      
//       if (oppositeIndices.length === 0) return null;
//       return oppositeIndices[Math.floor(Math.random() * oppositeIndices.length)];
//     };
    
//     const interval = setInterval(animateSequence, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Get animation class based on the bubble and phase
//   const getAnimationClass = (index) => {
//     if (index !== animatingBubble) return '';
    
//     // Different animation styles for different phases
//     if (animationPhase === 1) {
//       return 'animate-typing-effect';
//     } else if (animationPhase === 2) {
//       return 'animate-fade-in';
//     }
//     return '';
//   };

//   return (
//     <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 h-full">
//       <div className="max-w-md flex flex-col items-center text-center">
//         {/* Centered chat box with refined styling */}
//         <div className="bg-base-100 rounded-xl p-6 mb-6 w-full">
//           <div className="space-y-2">
//             {chatBubbles.map((bubble, index) => (
//               <div 
//                 key={index} 
//                 className={`flex ${bubble.sent ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div 
//                   className={`rounded-xl ${bubble.width} ${bubble.height} ${
//                     bubble.sent ? colors.sent : colors.received
//                   } transition-all duration-300 ${getAnimationClass(index)}`}
//                   style={{
//                     opacity: animatingBubble === index ? '1' : '0.8',
//                     transform: animatingBubble === index ? 'scale(1.02)' : 'scale(1)',
//                   }}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
        
//         <h2 className={`text-2xl font-bold mb-2 ${colors.text}`}>{title}</h2>
//         <p className="text-base-content/60 text-sm">{subtitle}</p>
//       </div>
//     </div>
//   );
// };

// // Add these animation keyframes to your global CSS or inline style element
// const animationStyles = `
//   @keyframes typingEffect {
//     0% { width: 0; opacity: 0.6; }
//     20% { width: 20%; opacity: 0.8; }
//     100% { width: 100%; opacity: 1; }
//   }
  
//   @keyframes fadeIn {
//     0% { opacity: 0; transform: translateY(4px); }
//     100% { opacity: 1; transform: translateY(0); }
//   }
  
//   .animate-typing-effect {
//     animation: typingEffect 0.8s ease-out forwards;
//   }
  
//   .animate-fade-in {
//     animation: fadeIn 0.5s ease-out forwards;
//   }
// `;

// export default AuthImagePattern;