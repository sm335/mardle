const { ChevronRight } = require("lucide-react")

export default function HeroDisplay({ name }) {
    return (
        <>
            <div className="flex gap-4 items-center">
                <img className="object-contain aspect-square text-sm text-black scale-[1.1]" alt={name} width="60px" src={`/heroes/${(name === 'Cloak' ? 'cloakdagger' : name === 'Dagger' ? 'cloakdagger' : name).toLowerCase().replace(/ /g, '')}.png`} />
                <span className="italic text-black">{name}</span>
            </div>
            <ChevronRight size={28} />
        </>
    )
}