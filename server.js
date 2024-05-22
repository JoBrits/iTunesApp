const express = require("express");
const bodyParser = require("body-parser");

// File System Module
const fs = require("fs");
const path = require("path");
const app = express();
const helmet = require('helmet');
const PORT = process.env.PORT || 3003;

// Updated functionality to store favorites in session storage and not favorites .json
// const favoritesFilePath = path.join(__dirname, "favorites.json");

// Integrate Helmet for security
app.use(helmet());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Updated functionality to store favorites in session storage and not favorites .json
// Ensure the favorites file exists
// if (!fs.existsSync(favoritesFilePath)) {
//   fs.writeFileSync(favoritesFilePath, JSON.stringify([]));
// }

// Search route
app.get('/search', async (req, res) => {
    const { term, media } = req.query; 
  
    if (!term) {
      return res.status(400).send({ error: 'Search term is required' });
    }
  
    try {
      const url = new URL('https://itunes.apple.com/search');
      url.searchParams.append('term', term);
      if (media && media !== 'all') {
        url.searchParams.append('media', media);
      }
      const response = await fetch(url.toString());
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch data from iTunes API' });
    }
  });

// Route to get track details by trackId
app.get("/track/:trackId", async (req, res) => {
  const { trackId } = req.params;

  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${trackId}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch data from iTunes API" });
  }
});

// Updated functionality to store favorites in session storage and not favorites .json
// Route to get all favorite tracks
// app.get("/favorites", (req, res) => {
//   fs.readFile(favoritesFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send({ error: "Failed to read favorites file" });
//     }

//     const favorites = JSON.parse(data);
//     res.send(favorites);
//   });
// });

// Route to save a favorite track
// app.post("/favorites", (req, res) => {
//   const { track } = req.body;

//   if (!track || !track.trackId) {
//     return res.status(400).send({ error: "Invalid track data" });
//   }

//   fs.readFile(favoritesFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send({ error: "Failed to read favorites file" });
//     }

//     const favorites = JSON.parse(data);
//     if (favorites.some((fav) => fav.trackId === track.trackId)) {
//       return res.status(400).send({ error: "Track is already in favorites" });
//     }

//     favorites.push(track);
//     fs.writeFile(
//       favoritesFilePath,
//       JSON.stringify(favorites, null, 2),
//       (err) => {
//         if (err) {
//           return res
//             .status(500)
//             .send({ error: "Failed to save favorite track" });
//         }

//         res.status(201).send({ message: "Track saved as favorite" });
//       }
//     );
//   });
// });

// Route to check if a track is in favorites
// app.get("/favorites/:trackId", (req, res) => {
//   const { trackId } = req.params;

//   fs.readFile(favoritesFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send({ error: "Failed to read favorites file" });
//     }

//     const favorites = JSON.parse(data);
//     const isFavorite = favorites.some(
//       (fav) => fav.trackId === parseInt(trackId, 10)
//     );
//     res.send({ isFavorite });
//   });
// });

// Route to remove a favorite track
// app.delete("/favorites/:trackId", (req, res) => {
//   const { trackId } = req.params;

//   fs.readFile(favoritesFilePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send({ error: "Failed to read favorites file" });
//     }

//     let favorites = JSON.parse(data);
//     const initialLength = favorites.length;
//     favorites = favorites.filter(
//       (fav) => fav.trackId !== parseInt(trackId, 10)
//     );

//     if (favorites.length === initialLength) {
//       return res.status(404).send({ error: "Track not found in favorites" });
//     }

//     fs.writeFile(
//       favoritesFilePath,
//       JSON.stringify(favorites, null, 2),
//       (err) => {
//         if (err) {
//           return res
//             .status(500)
//             .send({ error: "Failed to remove favorite track" });
//         }

//         res.status(200).send({ message: "Track removed from favorites" });
//       }
//     );
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
