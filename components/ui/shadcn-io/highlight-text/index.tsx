'use client';

import * as React from 'react';
import {
  motion,
  useInView,
  type HTMLMotionProps,
  type Transition,
  type UseInViewOptions,
} from 'motion/react';

import { cn } from '@/lib/utils';

type HighlightTextProps = HTMLMotionProps<'span'> & {
  text: string;
  inView?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
  inViewOnce?: boolean;
  transition?: Transition;
};

const HighlightText = React.forwardRef<HTMLSpanElement, HighlightTextProps>(({
  text,
  className,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  transition = { duration: 2, ease: 'easeInOut' },
  ...props
}, ref) => {
  const localRef = React.useRef<HTMLSpanElement>(null);
  const spanRef = ref || localRef;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = mounted && (!inView || inViewResult);

  // Konsistente Styles für Server und Client
  const baseStyles: React.CSSProperties = {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left center',
    display: 'inline',
    color: '#000000',
    // backgroundSize wird nur über animate gesteuert, nicht im style
  };

  return (
    <motion.span
      ref={spanRef}
      data-slot="highlight-text"
      initial={{ backgroundSize: '0% 100%' }}
      animate={mounted && isInView ? { backgroundSize: '100% 100%' } : { backgroundSize: '0% 100%' }}
      transition={mounted ? transition : { duration: 0 }}
      style={baseStyles}
      className={cn(
        `relative inline-block px-2 py-1 rounded-lg bg-gradient-to-r from-green-100 to-green-200 dark:from-green-500 dark:to-green-600`,
        className,
      )}
      {...props}
    >
      {text}
    </motion.span>
  );
});

HighlightText.displayName = 'HighlightText';

export { HighlightText, type HighlightTextProps };