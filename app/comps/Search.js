'use client';

import { useState, useEffect, useRef } from 'react'; 
import { AlertCircle } from 'lucide-react';

import HeroDisplay from "@/app/comps/ui/HeroDisplay";

export default function Search({ heroesList, setSelectedHeroes }) {
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef(null);

    const filteredHeroes = heroesList.filter((heroName) => 
        heroName.replace(/\s+/g, '').toLowerCase().includes(searchQuery.replace(/\s+/g, '').toLowerCase())
    );

    const AddHero = (name) => {
        setSelectedHeroes(prev => [...prev, name]);
        setSearchQuery('');
        setShowSearchBox(false);
    };

    const handleSearch = () => {
        if (showSearchBox && filteredHeroes.length > 0) {
            AddHero(filteredHeroes[0]);
            inputRef.current.blur();
        }
    };

    const handleBlur = (e) => {
        if (!e.relatedTarget || !e.relatedTarget.closest('.hero-dropdown')) {
            setShowSearchBox(false);
        }
    };

    useEffect(() => {
        inputRef.current.blur();
    }, [heroesList])

    useEffect(() => {
        console.log(showSearchBox);
    }, [showSearchBox])

    return (
        <div className="z-10 relative flex justify-between gap-2 pb-2 mb-4">
            <input
                ref={inputRef}
                className="w-full border-2 border-theme bg-black/50 transition-colors focus:border-themehover focus:bg-black/25 backdrop-blur outline-none rounded-md px-3 py-2 text-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchBox(true)}
                onBlur={handleBlur}
                placeholder="Guess Hero..."
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            
            <div className="overflow-hidden flex-shrink-0">
                <button
                    className="search-container"
                    onClick={handleSearch}
                >
                    SEARCH
                </button>
            </div>

            {showSearchBox || searchQuery.length > 0 ? (
                <div 
                    className="p-[2px] absolute rounded-lg w-full left-0 top-full bg-theme shadow-lg hero-dropdown"
                    tabIndex="-1"
                >
                    <div className="flex flex-col gap-1 overflow-y-auto max-h-[350px] p-2 heroes-container" style={{maskImage: ""}}>
                    {filteredHeroes.length > 0 ? (
                        filteredHeroes.map((heroName, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center font-semibold text-xl w-full hover:bg-black/10 rounded-md p-2 transition-colors text-transparent hover:text-black cursor-pointer"
                                onClick={() => AddHero(heroName)}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                <HeroDisplay
                                    key={index}
                                    name={heroName}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center gap-2 font-semibold text-lg text-black text-center w-full p-2">
                            <AlertCircle />
                            No Heroes Found
                        </div>
                    )}
                    </div>
                </div>
            ) : null}
        </div>
    );
};