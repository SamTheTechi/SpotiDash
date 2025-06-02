const cleanPlaylist = async (req, res) => {
  let token = await req.token;
  let { playlistId } = await req.body;

  if (!token || !playlistId) {
    res.status(404).json({ msg: `Token not found or Playlist not Selected` });
  }

  try {
  } catch (e) {
    console.log(`error fetching user info`);
  }
};

module.exports = {
  cleanPlaylist,
};
