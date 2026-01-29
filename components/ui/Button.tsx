import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    fullWidth?: boolean;
}

export function Button({
    children,
    className,
    variant = 'primary',
    fullWidth = false,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                "h-12 px-8 py-3", // Large touch targets
                {
                    'bg-lime text-foreground hover:bg-lime-dark shadow-sm': variant === 'primary',
                    'bg-lilac text-foreground hover:bg-lilac-light': variant === 'secondary',
                    'border-2 border-border bg-transparent hover:bg-zinc-50': variant === 'outline',
                    'hover:bg-zinc-100 text-muted hover:text-foreground': variant === 'ghost',
                    'w-full': fullWidth,
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
