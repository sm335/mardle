import { getTodaysHero } from "@/app/utils/dailyHeroes";

export async function GET(req) {
    const hero = getTodaysHero();

    const timeZoneOffset = -8 * 60 * 60 * 1000;
    const now = new Date();
    const utcNow = now.getTime();

    // TESTING ONLY; COMMENT BEFORE PRODUCTION
    // const hoursAhead = -2;
    // const minutesAhead = 0;
    // const secondsDiff = 0;

    // const laNow = new Date(utcNow + timeZoneOffset + hoursAhead * 60 * 60 * 1000 + minutesAhead * 60 * 1000 + secondsDiff * 1000);


    const laNow = new Date(utcNow + timeZoneOffset);

    const noonToday = new Date(laNow);
    noonToday.setHours(12, 0, 0, 0);

    let seconds;
    let date;

    console.log(laNow.getTime());

    if (laNow.getTime() < noonToday.getTime()) {
        console.log("Before 12PM");
        // Before 12 PM: Use yesterday's date
        const yesterday = new Date(laNow);
        yesterday.setDate(laNow.getDate() - 1);
        date = yesterday.toISOString().split('T')[0];

        // Time difference to today's noon
        seconds = Math.floor((noonToday - laNow) / 1000);
    } else {
        console.log("After 12PM");
        // After 12 PM: Use today's date
        date = laNow.toISOString().split('T')[0];

        // Time difference to tomorrow's noon
        const noonTomorrow = new Date(noonToday);
        noonTomorrow.setDate(noonTomorrow.getDate() + 1);
        seconds = Math.floor((noonTomorrow - laNow) / 1000);
    }

    console.log(date);

    return new Response(JSON.stringify({ seconds, date, hero }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}