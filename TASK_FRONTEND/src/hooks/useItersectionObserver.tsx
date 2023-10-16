import { RefObject, useEffect, useState } from "react";

const options:IntersectionObserverInit = {
    root: null,
    rootMargin: "-10px",
    threshold: 1,
  };
  export const useIntersectionObserver = (containerRef:RefObject<HTMLDivElement>) => {
    const [isVisible, setIsVisible] = useState(false);
    const callbackFunction= (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    };
  
    useEffect(() => {
      const observer = new IntersectionObserver(callbackFunction, options);
      if (containerRef.current) observer.observe(containerRef.current);
  
      const cleanUp = () => {
        if (containerRef.current) observer.unobserve(containerRef.current);
      }
  
      return cleanUp;
    }, [containerRef]);
  
    return [ containerRef, isVisible ]
    }
  