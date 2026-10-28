import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import type { ButtonHTMLAttributes } from 'react';
import { HiOutlineChevronDown } from 'react-icons/hi';

import { classNames } from '@/shared/lib/classNames';
import { Badge } from '@/shared/ui/Badge';

import { skillLabel } from '../model/labels';
import type { CitizenSkill, SkillName } from '../model/types';

const skillOrder = Object.keys(skillLabel) as SkillName[];

type Props = {
    label?: string;
    error?: string;
    value: CitizenSkill[];
    onChange: (value: CitizenSkill[]) => void;
};

function withNames(current: CitizenSkill[], names: SkillName[]) {
    return skillOrder
        .filter(name => names.includes(name))
        .map(name => current.find(skill => skill.name === name) ?? { name, level: 1 });
}

export function SkillSelect({ label = 'Навыки', error, value, onChange }: Props) {
    const selected = value.map(skill => skill.name);

    const setLevel = (name: SkillName, next: number) => {
        onChange(
            value.map(skill => (skill.name === name ? { ...skill, level: Math.min(10, Math.max(1, next)) } : skill)),
        );
    };

    return (
        <Field className="flex flex-col gap-2 text-sm">
            <Label className="text-secondary">{label}</Label>
            <Listbox value={selected} onChange={(names: SkillName[]) => onChange(withNames(value, names))} multiple>
                <div className="relative">
                    <ListboxButton
                        className={classNames(
                            'border-line bg-panel-2 text-main flex h-auto w-full items-start justify-between gap-2 rounded-md border px-3 py-2 text-left',
                            'focus:border-neon data-open:border-neon',
                            error && 'border-danger',
                        )}
                    >
                        <span className="flex min-w-0 flex-1 flex-wrap gap-1">
                            {value.length === 0 && <span className="text-secondary">Выберите навыки</span>}
                            {value.map(skill => (
                                <span
                                    key={skill.name}
                                    className="inline-flex items-center gap-1"
                                    onPointerDown={event => event.stopPropagation()}
                                    onClick={event => event.stopPropagation()}
                                >
                                    <Badge tone="neon">{`${skillLabel[skill.name]} ${skill.level}`}</Badge>
                                    <LevelButton
                                        label="Уменьшить"
                                        disabled={skill.level <= 1}
                                        onClick={() => setLevel(skill.name, skill.level - 1)}
                                    >
                                        −
                                    </LevelButton>
                                    <LevelButton
                                        label="Увеличить"
                                        disabled={skill.level >= 10}
                                        onClick={() => setLevel(skill.name, skill.level + 1)}
                                    >
                                        +
                                    </LevelButton>
                                </span>
                            ))}
                        </span>
                        <HiOutlineChevronDown className="text-secondary mt-1 shrink-0" />
                    </ListboxButton>
                    <ListboxOptions
                        anchor="bottom start"
                        className="border-line bg-panel-2 z-40 mt-1 max-h-60 w-(--button-width) overflow-auto rounded-md border py-1"
                    >
                        {skillOrder.map(name => (
                            <ListboxOption
                                key={name}
                                value={name}
                                className="text-main data-focus:bg-neon/10 data-selected:text-neon cursor-pointer px-3 py-2 text-sm"
                            >
                                {skillLabel[name]}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>
            {error && <span className="text-danger text-xs">{error}</span>}
        </Field>
    );
}

function LevelButton({ children, label, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
    return (
        <button
            type="button"
            aria-label={label}
            className="border-line text-main hover:border-neon/40 hover:text-neon size-7 rounded-md border disabled:opacity-40"
            {...rest}
        >
            {children}
        </button>
    );
}
