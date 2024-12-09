import json
import os

def load_existing_restaurants(filepath):
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as file:
            try:
                return json.load(file)
            except json.JSONDecodeError:
                return []
    return []

def save_restaurants(filepath, restaurants):
    with open(filepath, "w", encoding="utf-8") as file:
        json.dump(restaurants, file, ensure_ascii=False, separators=(',', ':'))

def add_restaurant():
    restaurant = {}
    
    restaurant["name"] = input("Enter the restaurant name: ")
    
    opening_times = []
    print("Enter the opening times (leave start blank to finish):")
    while True:
        start = input("  Start time (HHMM): ")
        if not start:
            break
        end = input("  End time (HHMM): ")
        opening_times.append({"start": f'{start[:2]}:{start[2:]}', "end": f'{end[:2]}:{end[2:]}'})
    restaurant["opening_time"] = opening_times
    
    type_options = ["早餐", "午餐", "晚餐", "點心", "宵夜"]
    print("\nChoose the restaurant types (multiple choices allowed, separated by comma):")
    print("Options: " + ", ".join([f"{i+1}: {type_options[i]}" for i in range(len(type_options))]))
    
    chosen_types = input("Enter the numbers corresponding to the types: ")
    restaurant["type"] = [type_options[int(i)-1] for i in chosen_types.split(",") if i.isdigit() and 1 <= int(i) <= len(type_options)]
    
    restaurant["address"] = input("Enter the address: ")
    restaurant["rating"] = float(input("Enter the rating: "))
    
    restaurant["price"] = {
        "low": int(input("Enter the lowest price: ")),
        "high": int(input("Enter the highest price: "))
    }
    
    location_options = ["校內", "118巷", "公館", "溫州街"]
    print("\nChoose the location (single choice):")
    print("Options: " + ", ".join([f"{i+1}: {location_options[i]}" for i in range(len(location_options))]))
    
    chosen_location = input("Enter the number corresponding to the location: ")
    if chosen_location.isdigit() and 1 <= int(chosen_location) <= len(location_options):
        restaurant["location"] = location_options[int(chosen_location) - 1]
    else:
        print("Invalid selection. Defaulting to '校內'.")
        restaurant["location"] = "校內"
    
    restaurant["link"] = input("Enter the Google Maps link: ")
    
    return restaurant

def main():
    filepath = "./public/restaurants.json"
    
    restaurants = load_existing_restaurants(filepath)
    
    while True:
        new_restaurant = add_restaurant()
        restaurants.append(new_restaurant)
        
        another = input("Do you want to add another restaurant? (y/n): ").lower()
        if another != 'y':
            break
    
    save_restaurants(filepath, restaurants)
    print(f"Data saved successfully to {filepath}.")

if __name__ == "__main__":
    main()
