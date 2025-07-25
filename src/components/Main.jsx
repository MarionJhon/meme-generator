import { useState, useEffect } from "react";

const Main = () => {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))
  },[])

  const memeImage = () => {
    const randomNum = Math.floor(Math.random() * allMemes.length)
    const newMemeUrl = allMemes[randomNum].url
    setMeme(prevMeme => ({
      ...prevMeme,
      imageUrl: newMemeUrl
    }))
  }

  const handleChange = (event) => {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };
  return (
    <main>
      <div className="form">
        <label htmlFor="topText">
          Top Text
          <input
            type="text"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="bottomText">
          Bottom Text
          <input
            type="text"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </label>
        <button onClick={memeImage}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} alt="meme-image" />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
};

export default Main;
