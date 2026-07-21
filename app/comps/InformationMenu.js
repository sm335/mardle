import TimeUntilRefresh from "@/app/comps/TimeUntilRefresh"

export default function InformationMenu({ dailyStreak, guessedTodaysHero, secondsLeft }) {
    return (
        <div className="mb-8 border-2 border-yellow-300 bg-black/50 backdrop-blur rounded-lg mx-auto p-6 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-gray-100 mb-2">
                {guessedTodaysHero ? "Hero Guessed! Well done!" : "Guess Today's Hero!"}
            </h2>
            <TimeUntilRefresh
                secondsLeft={secondsLeft}
            />
            <div className="flex gap-8">
                <div className="w-12 h-12 rounded-full bg-red-300/90"></div>
                <div className="flex flex-col gap-1 items-center text-gray-100">
                {guessedTodaysHero ? (
                    <div className="w-12 h-12 rounded-full bg-green-600 flex justify-center items-center font-semibold text-lg">
                        {dailyStreak}
                    </div>
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-600 flex justify-center items-center font-semibold text-lg">
                        {dailyStreak}
                    </div>  
                )}
                    Day Streak
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-300/90"></div>
            </div>
        </div>
    )
}