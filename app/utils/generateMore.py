import random
from datetime import datetime, timedelta

# Define the heroes list
heroes = [
    "Adam Warlock", "Black Panther", "Black Widow", "Captain America", "Cloak", 
    "Dagger", "Doctor Strange", "Groot", "Hawkeye", "Hela", "Bruce Banner", 
    "Hulk", "Invisible Woman", "Iron Fist", "Iron Man", "Jeff the Land Shark", 
    "Loki", "Luna Snow", "Magik", "Magneto", "Mantis", "Mister Fantastic", 
    "Moon Knight", "Namor", "Peni Parker", "Psylocke", "Rocket Raccoon", 
    "Scarlet Witch", "Spider Man", "Squirrel Girl", "Star Lord", "Storm", 
    "The Punisher", "Thor", "Venom", "Winter Soldier", "Wolverine"
]

# Function to generate random hero for each day
def generate_random_heroes(start_date, end_date):
    # Calculate number of days
    delta = end_date - start_date
    hero_dates = {}
    
    # To keep track of used heroes, preventing repeats
    used_heroes = set()

    for i in range(delta.days + 1):
        # Current date
        current_date = start_date + timedelta(days=i)
        
        # Format the date as M/D/YY (remove leading zeros manually)
        date_str = f"{current_date.month}/{current_date.day}/{current_date.year % 100:02d}"
        
        # Ensure the hero for the current day is not the same as the previous day
        available_heroes = [hero for hero in heroes if hero not in used_heroes]
        
        if available_heroes:
            # Randomly choose a hero that's not already used
            hero = random.choice(available_heroes)
            
            # Store the date and hero
            hero_dates[date_str] = hero
            used_heroes.add(hero)  # Add the chosen hero to the set of used heroes
        else:
            # If we run out of unique heroes, just reset the used heroes set and pick again
            used_heroes.clear()
            hero = random.choice(heroes)
            hero_dates[date_str] = hero
            used_heroes.add(hero)  # Add the hero back to the used set

    return hero_dates

# Define the start and end dates
start_date = datetime(2025, 1, 1)
end_date = datetime(2026, 12, 31)

# Generate the random heroes
hero_dates = generate_random_heroes(start_date, end_date)

# Print the results
for date, hero in hero_dates.items():
    print("{ " + f"'{date}': '{hero}'" + " },")
