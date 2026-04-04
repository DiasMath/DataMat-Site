import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;
    
    const hashId = hash.replace("#", "");
    
    if (hashId) {
      const element = document.getElementById(hashId);
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: "smooth" });
        });
      }
    } else {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }, [hash, pathname]);
  
  useEffect(() => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);
}