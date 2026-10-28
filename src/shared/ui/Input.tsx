import { Field, Label } from '@headlessui/react';
import type { InputHTMLAttributes } from 'react';

import { classNames } from '@/shared/lib/classNames';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};

export function Input({ label, error, className, id, ...rest }: Props) {
    return (
        <Field className="flex flex-col gap-2 text-sm">
            {label && <Label className="text-secondary">{label}</Label>}
            <input
                id={id ?? rest.name}
                className={classNames(
                    'border-line bg-panel-2 text-main rounded-md border px-3 py-2 transition outline-none',
                    'placeholder:text-secondary/60 focus:border-neon',
                    error && 'border-danger',
                    className,
                )}
                {...rest}
            />
            {error && <span className="text-danger text-xs">{error}</span>}
        </Field>
    );
}
