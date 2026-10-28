import { Badge } from '@/shared/ui/Badge';

import { employmentLabel, employmentTone } from '../model/labels';
import type { EmploymentStatus } from '../model/types';

export function EmploymentBadge({ status }: { status: EmploymentStatus }) {
    return <Badge tone={employmentTone[status]}>{employmentLabel[status]}</Badge>;
}
