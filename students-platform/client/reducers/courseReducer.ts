import { Course } from "@/types/course";

export interface ActionType {
    type: "getAll" | "search"|"pagination";
    payload: Course[];
}

export function courseReducer(state: Course[], action: ActionType) {
    switch (action.type) {
        case "getAll":
            return action.payload.slice();
        case "search":
            return action.payload.slice();
        case "pagination":
            return action.payload.slice();
        default:
            return state;
    }
}
