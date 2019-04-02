import React, { useState, useEffect, useContext } from "react";
import pf, { ANIMALS } from "petfinder-client";
import ThemeContext from "./ThemeContext";
import useDropdown from "./useDropdown";
import Results from "./Results";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

const SearchParams = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  const [pets, setPets] = useState([]);
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  const requestPets = async () => {
    const res = await petfinder.pet.find({
      location,
      breed,
      animal,
      output: "full"
    });

    setPets(res.petfinder.pets.pet);
  };
  useEffect(() => {
    setBreed("");
    setBreeds([]);
    petfinder.breed.list({ animal }).then(res => {
      setBreeds(res.petfinder.breeds.breed);
    }, console.error);
  }, [animal]);

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            onChange={e => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location"
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            name="theme"
            id="theme"
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}
          >
            <option value="darkblue">Dark Blue</option>
            <option value="peru">Peru</option>
            <option value="orange">Orange</option>
            <option value="purple">Purple</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
