"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ContextDialog = DialogPrimitive.Root

const ContextDialogTrigger = DialogPrimitive.Trigger

const ContextDialogPortal = DialogPrimitive.Portal

const ContextDialogClose = DialogPrimitive.Close

const ContextDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
ContextDialogOverlay.displayName = "ContextDialogOverlay"

interface ContextDialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  position?: { x: number; y: number }
}

const ContextDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ContextDialogContentProps
>(({ className, position, children, ...props }, ref) => {
  const [adjustedPosition, setAdjustedPosition] = React.useState({ 
    left: position?.x ? `${position.x}px` : '50%',
    top: position?.y ? `${position.y}px` : '50%',
    transform: position ? 'translate(-50%, 10%)' : 'translate(-50%, -50%)'
  });
  
  const contentRef = React.useRef<HTMLDivElement>(null);
  
  // Adjust position based on viewport boundaries when content is rendered
  React.useEffect(() => {
    if (!position || !contentRef.current) return;
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const contentRect = contentRef.current.getBoundingClientRect();
    const contentWidth = contentRect.width;
    const contentHeight = contentRect.height;
    
    // Check if dialog would go off-screen
    let x = position.x;
    let y = position.y;
    let xTransform = -50; // Default to centered horizontally
    let yTransform = 10;  // Default to slightly below trigger
    
    // Horizontal adjustment
    if (x + contentWidth/2 > windowWidth - 20) {
      // Too far right - adjust left or transform
      if (windowWidth - 20 - contentWidth > 0) {
        // Can fit if aligned to right
        x = windowWidth - 20;
        xTransform = -100; // Align right edge
      } else {
        // Center horizontally as fallback
        x = windowWidth / 2;
        xTransform = -50;
      }
    } else if (x - contentWidth/2 < 20) {
      // Too far left
      if (contentWidth + 20 < windowWidth) {
        // Can fit if aligned to left
        x = 20;
        xTransform = 0; // Align left edge
      } else {
        // Center horizontally as fallback
        x = windowWidth / 2;
        xTransform = -50;
      }
    }
    
    // Vertical adjustment - don't let it go below viewport
    if (y + contentHeight > windowHeight - 20) {
      // Position it above the trigger point if it goes below viewport
      y = position.y - 20;
      yTransform = -100; // Place above the trigger
    }
    
    setAdjustedPosition({
      left: `${x}px`,
      top: `${y}px`,
      transform: `translate(${xTransform}%, ${yTransform}%)`
    });
  }, [position]);

  return (
    <DialogPrimitive.Portal>
      <ContextDialogOverlay />
      <DialogPrimitive.Content
        ref={(node) => {
          // Pass the ref to the forwarded ref and keep our local ref
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          contentRef.current = node;
        }}
        style={adjustedPosition}
        className={cn(
          "fixed z-50 grid w-full max-w-lg border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
})
ContextDialogContent.displayName = "ContextDialogContent"

const ContextDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
ContextDialogHeader.displayName = "ContextDialogHeader"

const ContextDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
ContextDialogFooter.displayName = "ContextDialogFooter"

const ContextDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
ContextDialogTitle.displayName = "ContextDialogTitle"

const ContextDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
ContextDialogDescription.displayName = "ContextDialogDescription"

export {
  ContextDialog,
  ContextDialogPortal,
  ContextDialogOverlay,
  ContextDialogClose,
  ContextDialogTrigger,
  ContextDialogContent,
  ContextDialogHeader,
  ContextDialogFooter,
  ContextDialogTitle,
  ContextDialogDescription,
} 