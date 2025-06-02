const axios = require("axios");

const songs = async (req, res) => {
  let token = await req.token;
  let { range } = await req.body;
  if (!token || !range) {
    res.status(404).json({ msg: `Token not found or range not speicified` });
  }

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${range}_term&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const trackes = response.data.items;
    res.json({ trackes });
  } catch (e) {
    throw e;
  }
};

const artists = async (req, res) => {
  let token = await req.token;
  let { range } = await req.body;

  if (!token || !range) {
    res.status(404).json({ msg: `Token not found or range not speicified` });
  }

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/artists?time_range=${range}_term&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const artists = response.data.items;
    res.json({ artists });
  } catch (e) {
    throw e;
  }
};

const profile = async (req, res) => {
  let token = await req.token;

  if (!token) {
    res.status(404).json({ msg: `Token not found` });
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    res.json({ data });
  } catch (e) {
    throw e;
  }
};

const playlist = async (req, res) => {
  let token = await req.token;

  if (!token) {
    res.status(404).json({ msg: `Token not found` });
  }

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    let data = response.data.items;
    res.json({ data });
  } catch (e) {
    throw e;
  }
};

module.exports = {
  artists,
  songs,
  profile,
  playlist,
};
