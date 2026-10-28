import type { HTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames';

type Props = HTMLAttributes<HTMLElement> & {
    title?: string;
    action?: ReactNode;
    bodyClassName?: string;
};

export function Panel({ title, action, className, bodyClassName, children, ...rest }: Props) {
    return (
        <section className={classNames('border-line bg-panel/80 rounded-lg border', className)} {...rest}>
            {(title || action) && (
                <div className="border-line flex items-center justify-between gap-3 border-b px-4 py-3">
                    {title && <h2 className="text-main text-sm font-medium uppercase">{title}</h2>}
                    {action}
                </div>
            )}
            <div className={classNames('p-4', bodyClassName)}>{children}</div>
        </section>
    );
}
