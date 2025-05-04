import React, { useEffect, useState } from 'react';
import { Box, Flex, IconButton, Text, Center } from '@chakra-ui/react';
import { Calendar as BigCalendar, dateFnsLocalizer, Event as RBCEvent } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { enUS } from 'date-fns/locale/en-US';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Assignment, ModuleMaterial } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { getModuleById } from '@/src/lib/query/modules';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar-theme.css';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface CalendarEvent extends RBCEvent {
    id: number;
    title: string;
    type: 'assignment' | 'material';
    moduleId: number;
    programId: number;
}

interface CalendarProps {
    assignments: Assignment[];
    materials: ModuleMaterial[];
}

export default function Calendar({ assignments, materials }: CalendarProps) {
    const router = useRouter();
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleEventClick = (event: CalendarEvent) => {
        if (event.type === 'assignment') {
            router.push(`/programs/${event.programId}/assignments/${event.id}`);
        } else if (event.type === 'material') {
            router.push(`/programs/${event.programId}/materials/${event.id}`);
        }
    };

    const handlePrev = () => {
        const prev = new Date(currentDate);
        prev.setMonth(prev.getMonth() - 1);
        setCurrentDate(prev);
    };

    const handleNext = () => {
        const next = new Date(currentDate);
        next.setMonth(next.getMonth() + 1);
        setCurrentDate(next);
    };

    useEffect(() => {
        const mapDataToEvents = async () => {
            const allModuleIds = Array.from(
                new Set([...assignments.map(a => a.moduleId), ...materials.map(m => m.moduleId)]),
            ).filter((id): id is number => id !== null);

            const modules = await Promise.all(allModuleIds.map(id => getModuleById(id)));

            const moduleMap: Record<number, number> = {};
            modules.forEach(module => {
                if (module) {
                    moduleMap[module.id] = module.programId;
                }
            });

            const mappedAssignments: CalendarEvent[] = (assignments ?? [])
                .filter(assignment => assignment.dueDate !== null && assignment.moduleId !== null)
                .map(assignment => ({
                    id: assignment.id,
                    title: assignment.title,
                    start: new Date(assignment.dueDate as Date),
                    end: new Date(assignment.dueDate as Date),
                    allDay: true,
                    type: 'assignment',
                    moduleId: assignment.moduleId as number,
                    programId: moduleMap[assignment.moduleId as number] ?? -1,
                }));

            const mappedMaterials: CalendarEvent[] = (materials ?? [])
                .filter(material => material.createdAt !== null && material.moduleId !== null)
                .map(material => ({
                    id: material.id,
                    title: material.title,
                    start: new Date(material.createdAt as Date),
                    end: new Date(material.createdAt as Date),
                    allDay: true,
                    type: 'material',
                    moduleId: material.moduleId as number,
                    programId: moduleMap[material.moduleId as number] ?? -1,
                }));

            setEvents([...mappedAssignments, ...mappedMaterials]);
        };

        mapDataToEvents();
    }, [assignments, materials]);

    return (
        <Box>
            <Flex justify="space-between" align="center" mb={8}>
                <Flex align="center">
                    <IconButton aria-label="Previous month" variant="ghost" onClick={handlePrev} mr={2}>
                        <ChevronLeftIcon strokeWidth={'3px'} />
                    </IconButton>
                    <Center borderRadius="lg" shadow="md" paddingX={4} paddingY={2} width={48}>
                        <Text fontSize="lg" fontWeight={500}>
                            {format(currentDate, 'MMMM yyyy')}
                        </Text>
                    </Center>

                    <IconButton aria-label="Next month" variant="ghost" onClick={handleNext} ml={2}>
                        <ChevronRightIcon strokeWidth={'3px'} />
                    </IconButton>
                </Flex>
            </Flex>

            <Box height="85vh">
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={['month']}
                    date={currentDate}
                    onNavigate={setCurrentDate}
                    toolbar={false}
                    onSelectEvent={handleEventClick}
                    eventPropGetter={(event: CalendarEvent) => {
                        const className = event.type === 'assignment' ? 'rbc-event-assignment' : 'rbc-event-material';

                        return {
                            className,
                        };
                    }}
                />
            </Box>
        </Box>
    );
}
