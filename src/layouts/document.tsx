import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface BlockProps extends PropsWithChildren { 
  className?: string 
}
export default {
  /* 
  _base: ({ children, className, ...props }: BlockProps) => (
    <div {...props} className={cn(className)}>
      {children}
    </div>
  ),
  */
  Text: ({ children, className, ...props }: BlockProps) => (
    <p 
      {...props} 
      className={cn(
        "font-serif text-base",
        className
      )}
    >
      {children}
    </p>
  ),
  Em: ({ children, className, ...props }: BlockProps) => (
    <em
      {...props} 
      className={cn(
        "font-serif text-base",
        className
      )}
    >
      {children}
    </em>
  ),
  Strong: ({ children, className, ...props }: BlockProps) => (
    <strong 
      {...props} 
      className={cn(
        "font-serif text-base",
        className
      )}
    >
      {children}
    </strong>
  ),
  H1: ({ children, className, ...props }: BlockProps) => (
    <h1 
      {...props} 
      className={cn(
        "font-sans text-3xl",
        className
      )}
    >
      {children}
    </h1>
  ),
  H2: ({ children, className, ...props }: BlockProps) => (
    <h2
      {...props} 
      className={cn(
        "font-sans text-2xl",
        className
      )}
    >
      {children}
    </h2>
  ),
  H3: ({ children, className, ...props }: BlockProps) => (
    <h3 
      {...props} 
      className={cn(
        "font-sans text-xl",
        className
      )}
    >
      {children}
    </h3>
  ),
  H4: ({ children, className, ...props }: BlockProps) => (
    <h4
      {...props} 
      className={cn(
        "font-sans text-base",
        className
      )}
    >
      {children}
    </h4>
  ),
  H5: ({ children, className, ...props }: BlockProps) => (
    <h5 
      {...props} 
      className={cn(
        "font-sans text-sm",
        className
      )}
    >
      {children}
    </h5>
  ),
  H6: ({ children, className, ...props }: BlockProps) => (
    <h6 
      {...props} 
      className={cn(
        "font-sans text-xs",
        className
      )}
    >
      {children}
    </h6>
  ),
  Frame: ({ children, className, ...props }: BlockProps) => (
    <div
      {...props}
      className={cn(
        "w-full h-fit max-w-screen-lg px-6 md:px-8 mb-16",
        "flex flex-col justify-start items-start",
        className,
      )}
    >
      {children}
    </div>
  ),
  Section: ({ children, className, ...props }: BlockProps) => (
    <div 
      {...props} 
      className={cn(
        "mt-8",
        "flex flex-col justify-start items-start gap-4",
        className
      )}
    >
      {children}
    </div>
  ),
  SectionTitle: ({ children, className, ...props }: BlockProps) => (
    <div 
      {...props} 
      className={cn(
        "font-sans font-bold text-xl mb-2",
        className
      )}
    >
      {children}
    </div>
  ),
  Subsection: ({ children, className, ...props }: BlockProps) => (
    <div 
      {...props} 
      className={cn(
        "mt-4",
        "flex flex-col justify-start items-start gap-4",
        className
      )}
    >
      {children}
    </div>
  ),
  SubsectionTitle: ({ children, className, ...props }: BlockProps) => (
    <div 
      {...props} 
      className={cn(
        "font-sans font-bold text-base mb-2",
        className
      )}
    >
      {children}
    </div>
  ),
};
