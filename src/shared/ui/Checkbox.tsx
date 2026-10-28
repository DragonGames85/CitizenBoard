import { Field, Label } from '@headlessui/react';
import type { InputHTMLAttributes } from 'react';

import { classNames } from '@/shared/lib/classNames';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};

export function Checkbox({ label, className, id, ...rest }: Props) {
    return (
        <Field className="flex items-center gap-2 self-end pb-2 text-sm">
            <input
                id={id ?? rest.name}
                type="checkbox"
                className={classNames('accent-neon size-4', className)}
                {...rest}
            />
            <Label className="text-secondary cursor-pointer">{label}</Label>
        </Field>
    );
}
