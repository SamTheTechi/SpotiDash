const { FetchSongs, AddSongsIntoPlaylist } = require("../lib/func");
const DB = require(`../model/user`);

const userLogin = async (req, res) => {
  try {
    let { userId, userName } = await req.body;
    let access_token = await req.token;

    try {
      let User = await DB.findOne({ id: userId });

      if (!User) {
        await DB.create({ id: userId, name: userName });
        console.log(`user created`);
      }

      if (User && User.weekly.exist === true) {
        const PlaylistSongs = await FetchSongs(
          User.weekly.playlistId,
          50,
          0,
          access_token,
        );

        const weeklySongs = await FetchSongs(
          User.weekly.weeklyId,
          50,
          0,
          access_token,
        );

        const songsToBeAdded = weeklySongs
          .map((item) => {
            const Exist = !PlaylistSongs.some((track) => track === item);
            if (Exist) return item;
            else return null;
          })
          .filter(Boolean);

        AddSongsIntoPlaylist(
          songsToBeAdded,
          User.weekly.playlistId,
          access_token,
        );
        console.log(`weekly songs updated`);
      }
    } catch (e) {
      console.log(`error creating user info`);
    }
  } catch (e) {
    console.log(`error fetching user info`);
  }
  res.json({ response: `sucess` });
};

module.exports = {
  userLogin,
};
