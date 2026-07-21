import Game from "@/app/comps/Game"

export const metadata = {
    title: "Mardle.co - Marvel Rivals Riddles",
    description: "Every day, guess the Marvel Rivals Hero by using clues!",
};

export default function Home() {
    return (
        <Game />
    )
}