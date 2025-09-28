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

const iconMap = {
  DecentralizedIcon: "/icons/DecentralizedIcon.svg",
  DiverseAssetIcon: "/icons/DiverseAssetIcon.svg",
  CreatorAdvantagesIcon: "/icons/CreatorAdvantagesIcon.svg",
  EscrowIcon: "/icons/EscrowIcon.svg"
};

export function WhyChooseGrid({ items, columns = 2, showSteps = false }: CardGridProps) {
  return (
    <MotionDiv
      className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-0 container mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {items.map((item, index) => {
        const totalItems = items.length;
        const row = Math.floor(index / columns);
        const col = index % columns;
        const isLastRow = row === Math.floor((totalItems - 1) / columns);
        const isLastCol = col === columns - 1 || index === totalItems - 1;

        return (
          <MotionDiv variants={itemVariants} key={index}>
            <div className="relative h-full flex flex-col shadow rounded-xl md:rounded-none">
              <GlowingEffect
                spread={30}
                glow={true}
                disabled={false}
                proximity={40}
                inactiveZone={0.01}
                className="lg:hidden"
              />
              <div className={`relative flex h-full flex-col justify-between overflow-hidden p-6
                rounded-2xl md:rounded-none
                ${col < columns - 1 ? 'md:border-r' : ''}
                ${!isLastRow ? 'md:border-b' : ''}
                border-white/10`}>
              <div className="flex flex-col gap-6">
                <div className="mb-4 flex items-center gap-4">
                  <div className="
                    w-[70px] h-[70px] border-[3px] inset-shadow-border border-[#8570C7]/35 rounded-[20px] flex items-center justify-center
                    bg-gradient-to-tl from-[#8570C7]/0 to-[#8570C7]/50
                    ">
                    <img
                      src={iconMap[item.icon as keyof typeof iconMap]}
                      alt={`${item.title} icon`}
                      width={45}
                      height={45}
                      className="w-11.25 h-11.25"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-white/70">{item.description}</p>
              </div>
              {showSteps && (
                <div className="mt-6 text-sm font-medium text-white/70">
                  Step {index + 1}
                </div>
              )}
              </div>
            </div>
          </MotionDiv>
        );
      })}
    </MotionDiv>
  );
}