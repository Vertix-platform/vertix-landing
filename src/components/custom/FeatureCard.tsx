import { GlowingEffect } from "../ui/glowing-effect";
import { MotionDiv } from "../ui/motion";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
  onCardHover: (index: number | null) => void;
  isExpanded: boolean;
}

const iconMap = {
  HybridIcon: "/src/assets/icons/HybridIcon.svg",
  CreatorNFTIcon: "/src/assets/icons/CreatorNFTIcon.svg",
  SecureIcon: "/src/assets/icons/SecureIcon.svg",
  VerificationIcon: "/src/assets/icons/VerificationIcon.svg"
};


export function FeatureCard({ feature, index, onCardHover, isExpanded }: FeatureCardProps) {
  return (
    <MotionDiv
      className={`relative rounded-2xl cursor-pointer md:hover:shadow-lg transition-shadow duration-300`}
      whileHover={{ y: -5 }}
      onHoverStart={() => onCardHover(index)}
      onHoverEnd={() => onCardHover(null)}
      onTouchStart={() => onCardHover(index)}
      onTouchEnd={() => onCardHover(null)}
      initial={false}
      animate={{
        height: 'auto'
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
        <GlowingEffect
          spread={30}
          glow={true}
          disabled={false}
          proximity={40}
          inactiveZone={0.01}
        />

      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-lg bg-zinc-800/50 p-6 glassmorphism">
        <div className={`flex flex-row items-center gap-6 ${isExpanded ? 'mb-6' : ''}`}>
          <div className="w-[54px] h-[54px] border-[3px] inset-shadow-border border-[#8570C7]/35 rounded-[20px] flex items-center justify-center bg-gradient-to-tl from-[#8570C7]/0 to-[#8570C7]/50">
            <img
              src={iconMap[feature.icon as keyof typeof iconMap]}
              alt={feature.title}
              width={25}
              height={25}
              className="w-[25px] h-[25px]"
            />
          </div>
          <h3 className="text-xl font-bold mb-1.5 text-white">{feature.title}</h3>
        </div>
        {/* Always visible on mobile, hover on desktop */}
        <div className="text-white/70 md:hidden mt-2">
          <p>{feature.description}</p>
        </div>

        {/* Hover-triggered on desktop */}
        <MotionDiv
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="text-white/70 overflow-hidden hidden md:block"
        >
          <p>{feature.description}</p>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
} 