import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { HiOutlineChevronDown } from 'react-icons/hi';

import { classNames } from '@/shared/lib/classNames';

export type SelectOption = { value: string; label: string };

type Props = {
    label?: string;
    error?: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    name?: string;
};

export function Select(props: Props) {
    const { label, error, value, onChange, options, placeholder = 'Выберите', name } = props;
    const current = options.find(option => option.value === value);

    return (
        <Field className="flex flex-col gap-2 text-sm">
            {label && <Label className="text-secondary">{label}</Label>}
            <Listbox value={value} onChange={onChange} name={name}>
                <div className="relative">
                    <ListboxButton
                        className={classNames(
                            'border-line bg-panel-2 text-main flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-left',
                            'focus:border-neon data-open:border-neon',
                            error && 'border-danger',
                        )}
                    >
                        <span className={classNames('truncate', !current && 'text-secondary')}>
                            {current?.label ?? placeholder}
                        </span>
                        <HiOutlineChevronDown className="text-secondary shrink-0" />
                    </ListboxButton>
                    <ListboxOptions
                        anchor="bottom start"
                        className="border-line bg-panel-2 z-40 mt-1 max-h-60 w-(--button-width) overflow-auto rounded-md border py-1"
                    >
                        {options.map(option => (
                            <ListboxOption
                                key={option.value || 'empty'}
                                value={option.value}
                                className="text-main data-focus:bg-neon/10 data-selected:text-neon cursor-pointer px-3 py-2 text-sm"
                            >
                                {option.label}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>
            {error && <span className="text-danger text-xs">{error}</span>}
        </Field>
    );
}
