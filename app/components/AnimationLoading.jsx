const TypingAnimation = () => {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-800 animate-pulse"></div>
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-800 animate-pulse delay-75"></div>
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-800 animate-pulse delay-100"></div>
      </div>
    );
  };
  
  export default TypingAnimation;