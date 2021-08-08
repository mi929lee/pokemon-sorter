import React, { useState, useEffect } from "react";

const App = () => {
  const [field, setField] = useState();
  const [temp, setTemp] = useState();
  const [img, setImg] = useState();

  const [hp, setHp] = useState();
  const [attack, setAttack] = useState();
  const [defense, setDefense] = useState();
  const [specialAttack, setSpecialAttack] = useState();
  const [specialDefense, setSpecialDefense] = useState();
  const [speed, setSpeed] = useState();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
      );
      const json = await res.json();
      const urls = await json.results.map((item) => item.url);
      // console.log(urls);
      const images = await Promise.all(
        urls.map(async (url) => {
          const res = await fetch(url);
          const json = await res.json();
          return json.sprites.front_shiny;
        })
      );
      // console.log(images);
      setTemp(images);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setField(e.target[0].value);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${e.target[0].value}`
    );
    const json = await res.json();
    console.log(json);
    setImg(json.sprites.front_shiny);

    console.log(json.stats[0].base_stat);
    setHp(json.stats[0].base_stat);
    setAttack(json.stats[1].base_stat);
    setDefense(json.stats[2].base_stat);
    setSpecialAttack(json.stats[3].base_stat);
    setSpecialDefense(json.stats[4].base_stat);
    setSpeed(json.stats[5].base_stat);
  };

  return (
    <div>
      <h1>pokémon sorter</h1>
      <p>
        <strong>search for a pokémon</strong> by entering one of the following:
        <ul>
          <li>index number</li>
          <li>name</li>
        </ul>
        you will be able to view an <strong>image</strong> of the pokémon as
        well as its <strong>stats</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">Search</button>
      </form>

      <h3>search result: {field}</h3>
      
      {img && <img src={img} />}
      <p><strong>stats</strong></p>
      <ul>
        <li>hp: {hp}</li>
        <li>attack: {attack}</li>
        <li>defense: {defense}</li>
        <li>special attack: {specialAttack}</li>
        <li>special defense: {specialDefense}</li>
        <li>speed: {speed}</li>
      </ul>
      
      <hr />
      <h3>example pokémon images</h3>
      {temp ? (
        temp.map((item, idx) => <img key={idx} src={item} />)
      ) : (
        <p>Not loaded yet</p>
      )}
    </div>
  );
};

export default App;
