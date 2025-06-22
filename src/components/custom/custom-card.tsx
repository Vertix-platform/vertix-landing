import { GlowingEffect } from "../ui/glowing-effect";
import { MotionDiv } from "../ui/motion";

interface CardProps {
  icon: string;
  title: string;
  description: string;
  stepNumber?: number;
}

export function CustomCard({ icon, title, description, stepNumber }: CardProps) {
  return (
    <MotionDiv className="relative rounded-2xl border border-white/10">
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
            <i className={`${icon} text-2xl`} aria-hidden="true"></i>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-white/70">{description}</p>
          </div>
        </div>
        {stepNumber && (
          <div className="mt-6 text-sm font-medium text-white/50">
            Step {stepNumber}
          </div>
        )}
      </div>
    </MotionDiv>
  );
}