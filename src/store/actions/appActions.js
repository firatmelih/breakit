import { CHANGE_THEME } from "../types"

export function changeTheme (theme) {
    return {
        type: CHANGE_THEME,
        payload: theme
    }
}