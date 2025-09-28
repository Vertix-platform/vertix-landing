import { GlowingEffect } from "../ui/glowing-effect";
import { MotionDiv } from "../ui/motion";
import { Icon } from "@iconify/react";

interface CardItem {
  icon: string;
  title: string;
  description: string;
  stepNumber?: number;
  showStep?: boolean;
}

interface CardGridProps {
  items: CardItem[];
  columns?: number;
  showSteps?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function CustomGrid({ items, columns = 3, showSteps = false }: CardGridProps) {
  return (
    <MotionDiv
      className={`grid grid-cols-1 md:grid-cols-${columns} xl:grid-cols-4 gap-8`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {items.map((item, index) => (
        <MotionDiv variants={itemVariants} key={index}>
          <div className="relative rounded-2xl h-full flex flex-col">
            <GlowingEffect
              spread={30}
              glow={true}
              disabled={false}
              proximity={40}
              inactiveZone={0.01}
            />
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-lg bg-zinc-800/50 p-6 glassmorphism">
              {showSteps && (
                <div className="text-xl font-bold text-accent">
                  Step {index + 1}
                </div>
              )}
              <div className="flex items-center justify-center flex-col gap-6 mt-7.5">
                <div className="w-[70px] h-[70px] border-[3px] inset-shadow-border border-[#8570C7]/35 rounded-[20px] flex items-center justify-center bg-gradient-to-tl from-[#8570C7]/0 to-[#8570C7]/50">
                  <Icon icon={item.icon} width={40} height={40} className="text-accent" />
                </div>
                <div className="space-y-4 text-center">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-white">{item.description}</p>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      ))}
    </MotionDiv>
  );
}