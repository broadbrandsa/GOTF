import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'outline' | 'secondary' | 'lime' | 'lilac';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                {
                    'border-transparent bg-zinc-100 text-foreground hover:bg-zinc-200': variant === 'default',
                    'border-transparent bg-lilac/30 text-foreground': variant === 'secondary',
                    'text-foreground border border-border': variant === 'outline',
                    'bg-lime/50 text-foreground': variant === 'lime',
                    'bg-lilac/50 text-foreground': variant === 'lilac',
                },
                className
            )}
            {...props}
        />
    );
}
