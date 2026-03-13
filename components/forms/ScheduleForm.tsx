'use client';

type Availability = {
    startTime: string
    endTime: string
}

export function ScheduleForm({ schedule }: { schedule?: {
    timezone: string,
    availabilities: Availability[]
} }) {}