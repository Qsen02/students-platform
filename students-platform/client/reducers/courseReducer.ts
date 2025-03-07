import { Course } from "@/types/course";

export interface ActionType {
    type: "getAll" | "search";
    payload: Course[];
}

export function courseReducer(state: Course[], action: ActionType) {
    switch (action.type) {
        case "getAll":
            return action.payload.slice();
        case "search":
            return action.payload.slice();
        default:
            return state;
    }
}
