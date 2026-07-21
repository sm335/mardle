import Game from "@/app/comps/Game"

export const metadata = {
    title: "Endless Mode - Mardle.co",
    description: "Every day, guess the Marvel Rivals Hero by using clues!",
};

export default function Home() {
    return (
        <Game
            endless={true}
        />
    )
}