import React, { useState, useEffect } from "react";

const App = () => {
  const [field, setField] = useState();
  const [temp, setTemp] = useState();
  const [img, setImg] = useState();

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
    // console.log(json);
    setImg(json.sprites.front_shiny);
  };

  return (
    <div>
      <p>type in a <strong>pokemon index number</strong> to view the pokemon</p>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">Search</button>
      </form>
      <p>number: {field}</p>
      {img && <img src={img} />}
      <hr />
      {temp ? (
        temp.map((item, idx) => <img key={idx} src={item} />)
      ) : (
        <p>Not loaded yet</p>
      )}
    </div>
  );
};

export default App;
