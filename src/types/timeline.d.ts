export interface Event {
    year: string;
    title: string;
    description: string;
}

export interface Period {
    id: number;
    name: string;
    startYear: number;
    endYear: number;
    events: Event[];
}