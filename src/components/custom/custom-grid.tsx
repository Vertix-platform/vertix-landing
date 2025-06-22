import { GlowingEffect } from "../ui/glowing-effect";
import { MotionDiv } from "../ui/motion";

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
          <div className="relative rounded-2xl border border-white/10 h-full flex flex-col">
            <GlowingEffect
              spread={30}
              glow={true}
              disabled={false}
              proximity={40}
              inactiveZone={0.01}
            />
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-lg bg-zinc-800/50 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
              <div className="flex flex-col gap-6">
                <div className="w-12 h-12 border border-white/20 rounded-lg flex items-center justify-center">
                  <i className={`${item.icon} text-2xl`} aria-hidden="true"></i>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-white">{item.description}</p>
                </div>
              </div>
              {showSteps && (
                <div className="mt-6 text-sm font-medium text-white/50">
                  Step {index + 1}
                </div>
              )}
            </div>
          </div>
        </MotionDiv>
      ))}
    </MotionDiv>
  );
}