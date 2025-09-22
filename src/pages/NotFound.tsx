import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-galaxy">
      <div className="text-center space-y-6">
        <h1 className="mb-4 text-6xl font-bold gradient-neon-text font-orbitron">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! This page doesn't exist in our analysis database</p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-gradient-ai text-white rounded-lg hover:scale-105 transition-transform font-medium"
        >
          Return to DeepCheck Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
