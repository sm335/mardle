import { TriangleAlert, ShieldAlert, Skull } from "lucide-react"

export default function CheatingAlert({ setShowTamperedWithModal }) {
    return (
        <div className="fixed left-0 top-0 w-full h-full bg-black/75 z-50 flex justify-center items-center">
            <div className="flex flex-col items-center w-[500px] max-w-[95%] p-6 bg-white rounded-xl border-4 border-red-600">
                <div className="flex items-center gap-2 text-red-600 mb-8">
                    <TriangleAlert size={32} strokeWidth={2.5} />
                    <h2 className="text-2xl font-extrabold">CHEATING DETECTED</h2>
                    <TriangleAlert size={32} strokeWidth={2.5} />
                </div>
                <ShieldAlert
                    size={64}
                    strokeWidth={2.5}
                    className="mb-8 animate-pulse text-red-600"
                />
                <p className="text-center text-gray-600 font-bold text-lg mb-4">
                    Our systems have detected suspicious acivity.<br />Tampering with game data is against our ToS.
                </p>

                <span className="text-red-600 font-extrabold mb-4">
                    Your Actions Have Consequences:
                </span>

                <ul className="list-disc space-y-2 text-gray-800 font-semibold mb-8">
                    <li>All your in-game progress has been reset</li>
                    <li>Future violations might lead in a ban</li>
                </ul>

                <span className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                    <Skull size={14} />
                    Cheating kills the fun for everyone
                </span>
                <button
                    className="px-3 py-2 bg-red-600 rounded-md text-white font-semibold hover:bg-red-700 transition-colors"
                    onClick={() => setShowTamperedWithModal(false)}
                >
                    I Understand and Promise to Play Fair
                </button>
            </div>
        </div>
    )
}