import { useState } from 'react';
import { MotionDiv } from "../ui/motion";
import { FeatureCard } from "./FeatureCard";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  features: Feature[];
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

export function FeaturesGrid({ features }: FeaturesGridProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleCardHover = (index: number | null) => {
    setExpandedCard(index);
  };

  return (
    <MotionDiv
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
    >
      {features.map((feature, index) => (
        <MotionDiv variants={itemVariants} key={index}>
          <FeatureCard
            feature={feature}
            index={index}
            isExpanded={expandedCard === index}
            onCardHover={handleCardHover}
          />
        </MotionDiv>
      ))}
    </MotionDiv>
  );
} 