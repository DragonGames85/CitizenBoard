import { create } from 'zustand';

import { CITIZEN_COUNT } from '@/shared/consts/citizen';

import type { Citizen } from '../model/types';
import { generateCitizens } from './data';

type RegistryState = {
    citizens: Citizen[];
    citizenCount: number;
    updateCitizen: (id: string, patch: Partial<Citizen>) => Citizen | undefined;
    setCitizenCount: (count: number) => void;
    resetCitizens: () => void;
};

export const useCitizenStore = create<RegistryState>((set, get) => ({
    citizens: generateCitizens(CITIZEN_COUNT),
    citizenCount: CITIZEN_COUNT,
    updateCitizen: (id, patch) => {
        const citizenArray = get().citizens;
        const index = citizenArray.findIndex(citizen => citizen.id === id);
        const newCitizenArray = { ...citizenArray[index], ...patch, id };
        const copy = citizenArray.slice();
        copy[index] = newCitizenArray;
        set({ citizens: copy });
        return newCitizenArray;
    },
    setCitizenCount: count => {
        set({ citizenCount: count, citizens: generateCitizens(count) });
    },
    resetCitizens: () => {
        set({ citizens: generateCitizens(get().citizenCount) });
    },
}));
