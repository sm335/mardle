'use client';

import { encrypt, decrypt } from "@/app/utils/crypto";

export const initialize = (date) => {
    if (typeof window !== "undefined") {
        const streak = getValue("streak");

        if (streak) {
            if (getDayDifference(date) > 1) {
                setValue("streak", 0);
            }
        } else {
            setValue("streak", 0);
        }
    }
}

export const getDayDifference = (date) => {
    const lastDoneDate = getValue("lastDoneDate");

    try {
        const currentDate = new Date(date);
        const lastDone = lastDoneDate ? new Date(lastDoneDate) : null;
    
        if (lastDone) {
            const timeDifference = currentDate - lastDone;
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
            return daysDifference;
        } else {
            return 999999;
        }
    } catch {
        return 999999;
    }

}

export const hasDoneToday = (date) => {
    if (typeof window !== "undefined") {
        if (getValue("lastDoneDate") === date) {
            return true;
        } else {
            return false;
        }
    }
}

export const markAsDoneToday = (date) => {
    if (typeof window !== "undefined") {
        if (getValue("lastDoneDate") !== date && getDayDifference(date) !== 0) {
            setValue("lastDoneDate", date);
            setValue("streak", parseInt(getValue("streak")) + 1);
        }
    }
}

export const resetStats = () => {
    setValue("streak", 0);
    setValue("lastDoneDate", "2000-01-01")
}


export const addOneDay = (date) => {
    const datex = new Date(date);

    datex.setDate(datex.getDate() + 1);

    return datex.toISOString().split('T')[0];
}

export const getValue = (name) => {
    if (typeof window !== "undefined") {
        return decrypt(localStorage.getItem(name));
    } else {
        return false;
    }
}

export const setValue = (name, value) => {
    if (typeof window !== "undefined") {
        console.log(value);
        localStorage.setItem(name, encrypt(value));
    } else {
        return false;
    }
}
