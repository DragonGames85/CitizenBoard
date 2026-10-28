import { classNames } from '@/shared/lib/classNames';

const tones = {
    neon: 'border-neon/40 bg-neon/10 text-neon',
    lime: 'border-lime/40 bg-lime/10 text-lime',
    secondary: 'border-line bg-panel-2 text-secondary',
    warn: 'border-warn/40 bg-warn/10 text-warn',
    danger: 'border-danger/40 bg-danger/10 text-danger',
} as const;

type Props = {
    children: string;
    tone?: keyof typeof tones;
    className?: string;
};

export function Badge({ children, tone = 'secondary', className }: Props) {
    return (
        <span
            className={classNames(
                'inline-flex items-center rounded border px-2 py-1 text-xs font-medium',
                tones[tone],
                className,
            )}
        >
            {children}
        </span>
    );
}
