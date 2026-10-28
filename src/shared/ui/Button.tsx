import type { ButtonHTMLAttributes } from 'react';

import { classNames } from '@/shared/lib/classNames';

type Variant = 'primary' | 'ghost' | 'danger';

const styles: Record<Variant, string> = {
    primary: 'border-neon/50 bg-neon/15 text-neon hover:bg-neon/25',
    ghost: 'border-line bg-transparent text-main hover:border-neon/40 hover:text-neon',
    danger: 'border-danger/40 bg-danger/10 text-danger hover:bg-danger/20',
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
};

export function Button({ className, variant = 'primary', type = 'button', ...rest }: Props) {
    return (
        <button
            type={type}
            className={classNames(
                'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition disabled:opacity-50',
                styles[variant],
                className,
            )}
            {...rest}
        />
    );
}
