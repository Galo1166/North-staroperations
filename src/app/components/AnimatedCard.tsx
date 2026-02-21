import { motion, MotionProps } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cardVariants, featureCardVariants } from '../lib/animations';
import { ReactNode } from 'react';

interface AnimatedCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'feature';
  hover?: boolean;
  index?: number;
}

/**
 * Animated Card Component with smooth entrance and hover effects
 * Commonly used for features, services, and other card-based content
 */
export function AnimatedCard({
  children,
  className = '',
  variant = 'default',
  hover = true,
  index = 0,
  ...props
}: AnimatedCardProps) {
  const variants = variant === 'feature' ? featureCardVariants : cardVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      whileHover={hover ? 'hover' : undefined}
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      transition={{
        delay: index * 0.1,
      }}
      {...props}
    >
      <Card className={className}>
        {children}
      </Card>
    </motion.div>
  );
}

interface AnimatedCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedCardHeader({ children, className = '' }: AnimatedCardHeaderProps) {
  return (
    <CardHeader className={className}>
      {children}
    </CardHeader>
  );
}

interface AnimatedCardTitleProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedCardTitle({ children, className = '' }: AnimatedCardTitleProps) {
  return (
    <CardTitle className={className}>
      {children}
    </CardTitle>
  );
}

interface AnimatedCardContentProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedCardContent({ children, className = '' }: AnimatedCardContentProps) {
  return (
    <CardContent className={className}>
      {children}
    </CardContent>
  );
}

export default AnimatedCard;
