'use client';

import { AlertCircle, LoaderCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";

import InformationMenu from "@/app/comps/InformationMenu";
import Search from "@/app/comps/Search"

import HeroParameter from "@/app/comps/ui/HeroParameter";
import Confetti from "@/app/comps/ui/Confetti";

import { heroes } from "@/app/utils/heroData";
import { initialize, markAsDoneToday, addOneDay, hasDoneToday, getValue, resetStats } from '@/app/utils/storage.js';
import CheatingAlert from "./ui/CheatingAlert";

const getHeroParams = (name) => {
    let result;

    Object.entries(heroes).map((data, i) => {
        if (data[0] === name) {
            result = data[1];
            return;
        }
    })

    return result;
}


const HeroParameterCategory = ({ text }) => {
    return (
        <div className="font-[700] uppercase italic mb-3">
            {text}
        </div>
    )
}

export default function Game() {
    const [secondsLeftBeforeReset, setSecondsLeftBeforeReset] = useState(0);
    const [gameDate, setGameDate] = useState(null);
    const [showTamperedWithModal, setShowTamperedWithModal] = useState(false);

    const [fetchError, setFetchError] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [dailyHero, setDailyHero] = useState(null);
    const [dailyHeroParams, setDailyHeroParams] = useState(null);
    const [selectedHeroes, setSelectedHeroes] = useState([])
    const [heroesList, setHeroesList] = useState(Object.entries(heroes).map(data => data[0]));
    const updateHeroTimeoutRef = useRef(null);
    const setGuessedHeroTimeoutRef = useRef(null);

    const [guessedHero, setGuessedHero] = useState(false);
    const [dailyStreak, setDailyStreak] = useState(null);

    const onGuessedCorrectly = () => {
        const streak = getValue("streak");

        if (streak !== "tampered") {
            const newStreak = parseInt(streak) + 1;
            markAsDoneToday(gameDate);
    
            setDailyStreak(newStreak);
            setGuessedHero(true);
            setShowConfetti(true);
    
            setGuessedHeroTimeoutRef.current = null;
        } else {
            flagAntiCheat();
            return;
        }
    }

    const flagAntiCheat = () => {
        resetStats();

        setSelectedHeroes([]);
        setGuessedHero(false);
        setShowConfetti(false);
        setDailyStreak(0);

        setShowTamperedWithModal(true);
    }

    const runAntiCheat = (date) => {
        // ALL OF THE DESCRIPTIONS ARE POSSIBLE SCENARIOS THAT ARE VIRTUALLY 
        // IMPOSSIBLE TO ACHIEVE WITHOUT TAMPERING WITH LOCALSTORAGE DATA

        const streak = getValue("streak");
        const lastDoneDate = getValue("lastDoneDate");

        // One of the values show tampered
        if (streak === "tampered" || lastDoneDate === "tampered") {
            console.log(streak, lastDoneDate)
            console.log("Anti-Cheat Flagged: ", "Data Tampered");
            flagAntiCheat();
            return;
        }

        if (lastDoneDate !== null) {
            // Checking if date is a value
            try {
                const date = new Date(lastDoneDate);
                const isValidDate = date instanceof Date && !isNaN(date.getTime()) && lastDoneDate === date.toISOString().split('T')[0]
                if (!isValidDate) {
                    flagAntiCheat();
                    return;
                }
            } catch {
                console.log("Anti-Cheat Flagged: ", "lastDoneDate is not a date");
                flagAntiCheat();
                return;
            }
        } else {
            // Date is null, yet streak is above 0
            if (parseInt(streak) > 0) {
                console.log("Anti-Cheat Flagged: ", "Date is null, yet streak is above 0");
                flagAntiCheat();
            }
        }
    }

    useEffect(() => {
        setHeroesList(Object.entries(heroes).map(data => data[0]).filter(hero => !selectedHeroes.includes(hero)));
    }, [selectedHeroes]);

    useEffect(() => {
        const plzzzzwork = async () => {
            const fetchData = async () => {
                try {
                    const response = await fetch('/api/info');
                    if (response.ok) {
                        const data = await response.json();
                        setDailyHero(data.hero);
                        setDailyHeroParams(getHeroParams(data.hero));
                        setSecondsLeftBeforeReset(data.seconds);
                        return data;
                    } else {
                        setFetchError(true);
                    }
                } catch {
                    setFetchError(true);
                }
            }
    
            const timeInformation = await fetchData();
            setGameDate(timeInformation.date);
    
            const updateHeroAndResetGame = () => {
                const newDate = addOneDay(gameDate || timeInformation.date);
    
                initialize(newDate);
                setGameDate(newDate);
    
                setDailyHero(null);
                fetchData();
                setSelectedHeroes([]);
                setGuessedHero(false);
                setShowConfetti(false);
    
                updateHeroTimeoutRef.current = setTimeout(updateHeroAndResetGame, 86400000);
            }
        
            updateHeroTimeoutRef.current = setTimeout(updateHeroAndResetGame, timeInformation.seconds * 1000);
    
            if (hasDoneToday(timeInformation.date)) {
                setGuessedHero(true);
            }

            runAntiCheat(timeInformation.date);
            initialize(timeInformation.date);

            const streak = getValue("streak");
            console.log("Streak:", streak);
    
            if (!streak) {
                setDailyStreak(0)
            } else if (streak === "tampered") {
                flagAntiCheat();
            } else {
                setDailyStreak(streak)
            }
        }

        plzzzzwork();

        return () => {
            if (updateHeroTimeoutRef.current) clearTimeout(updateHeroTimeoutRef.current);
        }
    }, [])

    return (
        <>
        {secondsLeftBeforeReset ? (
            <InformationMenu
                dailyStreak={dailyStreak}
                guessedTodaysHero={guessedHero}
                secondsLeft={secondsLeftBeforeReset}
            />
        ) : null}
        {fetchError ? (
            <div className="flex gap-2 font-semibold text-white rounded-lg bg-red-500 mx-auto p-4">
                <AlertCircle />
                Unknown error, please refresh the page...
            </div>
        ) : !dailyHero ? (
            <LoaderCircle className="text-white mx-auto animate-spin" size={60} />
        ) : (
            <>
            <Search
                heroesList={heroesList}
                setSelectedHeroes={setSelectedHeroes}
            />
            <div className="flex flex-col-reverse gap-1 text-white text-center w-100% min-w-[500px] mb-10">
                {selectedHeroes.map((heroName, index) => {
                    const heroParams = getHeroParams(heroName);

                    if (!setGuessedHeroTimeoutRef.current && dailyHero === heroName && !guessedHero) {
                        setGuessedHeroTimeoutRef.current = setTimeout(onGuessedCorrectly, 2500)
                    }

                    return (
                        <div key={index} className="grid grid-cols-6 md:grid-cols-6 gap-1">
                            <HeroParameter
                                text={heroName}
                                correct={dailyHero === heroName}
                                showHero={true}
                                bold={true}
                            />
                            <HeroParameter
                                text={heroParams.gender}
                                correct={heroParams.gender === dailyHeroParams.gender}
                                showGender={true}
                            />
                            <HeroParameter
                                text={heroParams.role}
                                correct={heroParams.role === dailyHeroParams.role}
                                showRole={true}
                            />
                            <HeroParameter
                                text={heroParams.difficulty}
                                correct={heroParams.difficulty === dailyHeroParams.difficulty}
                                showStars={true}
                            />
                            <HeroParameter
                                text={heroParams.eyeColor}
                                correct={heroParams.eyeColor === dailyHeroParams.eyeColor}
                                showEyes={true}
                            />
                            <HeroParameter
                                text={heroParams.hair}
                                correct={heroParams.hair === dailyHeroParams.hair}
                                showHair={true}
                            />
                        </div>
                    )
                })}

                {selectedHeroes.length > 0 ? (
                    <div className="grid grid-cols-6 gap-1">
                        <HeroParameterCategory
                            text="Hero"
                        />
                        <HeroParameterCategory
                            text="Gender"
                        />
                        <HeroParameterCategory
                            text="Role"
                        />
                        <HeroParameterCategory
                            text="Difficulty"
                        />
                        <HeroParameterCategory
                            text="Eyes"
                        />
                        <HeroParameterCategory
                            text="Hair"
                        />
                    </div>
                ) : null}
            </div>
            {showTamperedWithModal ? (
                <CheatingAlert setShowTamperedWithModal={setShowTamperedWithModal} />
            ) : null}
            {showConfetti ? (
                    <Confetti />
                ) : null}
            </>
        )}
        </>
    )
}
