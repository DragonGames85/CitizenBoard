export { generateCitizens } from './api/data';
export { useCitizenStore } from './api/storage';
export {
    documentKindLabel,
    employmentLabel,
    genderLabel,
    nationalityLabel,
    relationLabel,
    skillLabel,
} from './model/labels';
export { applyDigitMask, maskDigitCount, passportMask, passportPlaceholder } from './model/passport';
export { buildDashboardStats } from './model/stats';
export type {
    Citizen,
    CitizenDocument,
    CitizenFilters,
    CitizenSkill,
    DocumentKind,
    EmploymentStatus,
    FamilyMember,
    FamilyRelation,
    Gender,
    Nationality,
    SkillName,
} from './model/types';
export { SkillSelect } from './ui/SkillSelect';
export { CitizenCountControl } from './ui/CitizenCountControl';
export { EmploymentBadge } from './ui/EmploymentBadge';
