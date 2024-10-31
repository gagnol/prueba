"use client";

import { useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
  item: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, item }) => {
  const progressTextRef = useRef<HTMLParagraphElement>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    let animationInstance: any;
    if (inView) {
      animationInstance = animate(0, value, {
        duration: 2,
        onUpdate: (cv) => {
          if (progressTextRef.current) {
            progressTextRef.current.textContent = `${cv.toFixed(0)}`;
          }
        },
      });
    }
  }, [value, inView]);

  return (
    <div ref={ref} className="flex items-center gap-2 my-5">
      {/* Título de la métrica */}
      <h1 className="font-bold ">{item}</h1>

      {/* Contenedor del Progress */}
      <div className="flex-1">
        <Progress
          value={inView ? value : 0}
          className="h-4 transition-all duration-500 ease-in-out"
        />
      </div>
      {/* Porcentaje animado */}
      <div className="flex items-center gap-1 w-[40px] font-bold ">
        <motion.p ref={progressTextRef}>0</motion.p>
        <span>%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
