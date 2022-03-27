import { CHANGE_THEME, CHANGE_LANGUAGE } from "../types"

export function changeTheme (theme) {
    return {
        type: CHANGE_THEME,
        payload: theme
    }
}

export function changeLanguage (language) {
    return {
        type: CHANGE_LANGUAGE,
        payload: language
    }
}
