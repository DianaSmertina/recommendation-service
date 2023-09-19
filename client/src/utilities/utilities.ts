import { IGroup } from "../types/types";

export function formatDate(stringDate: string, region: string) {
    const date = new Date(stringDate);
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    return date.toLocaleDateString(region, options);
}

export function getGroupById(groups: Array<IGroup>, id: string) {
    return groups.find(group => group.id === Number(id) )?.name;
}