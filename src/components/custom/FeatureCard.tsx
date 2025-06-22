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

export function FeatureCard({ feature, index, onCardHover, isExpanded }: FeatureCardProps) {
  return (
    <MotionDiv
      className={`relative rounded-2xl border border-white/10 cursor-pointer ${isExpanded ? 'expanded' : ''}`}
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
            //   client:visible
            />

      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-lg bg-zinc-800/50 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
        <div className={`flex flex-row items-center gap-6 ${isExpanded ? 'mb-6' : ''}`}>
          <div className="w-12 h-12 border border-white/20 rounded-lg flex items-center justify-center">
            <i className={`${feature.icon} text-2xl text-white`} aria-hidden="true"></i>
          </div>
          <h3 className="text-xl font-bold mb-1.5 text-white">{feature.title}</h3>
        </div>
        <MotionDiv
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? 'auto' : 0
          }}
          transition={{ duration: 0.3 }}
          className="text-white/70 overflow-hidden"
        >
          <p>{feature.description}</p>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
} 