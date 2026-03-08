"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

interface StaggerItem {
  tempId: number;
  testimonial: string;
  by: string;
  imgSrc: string;
}

interface TestimonialCardProps {
  position: number;
  item: StaggerItem;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  item,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-[#1E3A5F] text-white border-[#1E3A5F]"
          : "z-0 bg-white text-slate-800 border-slate-200 hover:border-[#F59E0B]"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px #e2e8f0"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-slate-200"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <img
        src={item.imgSrc}
        alt={item.by.split(",")[0]}
        className="mb-4 h-14 w-12 object-cover object-top bg-slate-100"
        style={{
          boxShadow: "3px 3px 0px #f8fafc",
        }}
      />
      <h3
        className={cn(
          "text-base sm:text-xl font-medium",
          isCenter ? "text-white" : "text-slate-800"
        )}
      >
        &ldquo;{item.testimonial}&rdquo;
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-white/80" : "text-slate-500"
        )}
      >
        &mdash; {item.by}
      </p>
    </div>
  );
};

interface StaggerTestimonialsProps {
  items: StaggerItem[];
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({
  items,
}) => {
  const [cardSize, setCardSize] = useState(365);
  const [list, setList] = useState(items);

  const handleMove = (steps: number) => {
    const newList = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-slate-50" style={{ height: 600 }}>
      {list.map((item, index) => {
        const position =
          list.length % 2
            ? index - (list.length + 1) / 2
            : index - list.length / 2;
        return (
          <TestimonialCard
            key={item.tempId}
            item={item}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-14 w-14 items-center justify-center border-2 border-slate-200 bg-white text-slate-700 hover:bg-[#1E3A5F] hover:text-white hover:border-[#1E3A5F] transition-colors focus-visible:outline-none"
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-14 w-14 items-center justify-center border-2 border-slate-200 bg-white text-slate-700 hover:bg-[#1E3A5F] hover:text-white hover:border-[#1E3A5F] transition-colors focus-visible:outline-none"
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default StaggerTestimonials;
