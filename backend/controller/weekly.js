const DB = require(`../model/user`);

const {
  Createplaylist,
  FetchAllUserPlaylist,
  FetchSongs,
  AddSongsIntoPlaylist,
} = require("../lib/func");

const updateWeekly = async (req, res) => {
  try {
    let token = await req.token;

    let userId = await req.body.userID;
    let playlistName = await req.body.name;
    let playlistDescription = await req.body.description;

    const PlaylistExist = await DB.findOne({
      id: userId,
      "weekly.exist": false,
    }).lean();

    const weeklyPlaylistExist = await DB.findOne({
      userKey: userId,
      "weekly.exist": true,
    }).lean();

    const val = await FetchAllUserPlaylist(access_token);
    const PlaylistExistID = await val
      .filter((items) => items.id === weeklyPlaylistExist?.weekly.playlistID)
      .map((item) => item.id)[0];

    if (PlaylistExist || !PlaylistExistID) {
      const newWeeklyPlaylist = await Createplaylist(
        playlistName,
        playlistDescription,
        userId,
        access_token,
      );
      console.log(`new playlist created for user ${userId}`);

      const PlaylistSongs = await FetchSongs(
        weeklyPlaylistId,
        50,
        0,
        access_token,
      );

      await DB.findOneAndUpdate(
        {
          userKey: userID,
          "weekly.exist": true,
        },
        {
          $set: {
            "weekly.playlistID": newWeeklyPlaylist,
          },
        },
      );

      await DB.findOneAndUpdate(
        {
          userKey: userID,
          "weekly.exist": false,
        },
        {
          $set: {
            "weekly.exist": true,
            "weekly.weeklyID": weeklyPlaylistId,
            "weekly.playlistID": newWeeklyPlaylist,
          },
        },
      );

      await AddSongsIntoPlaylist(
        PlaylistSongs,
        newWeeklyPlaylist,
        access_token,
      );

      res.status(200).send(`Playlist created and songs added.`);
    } else {
      console.log("weekly already setuped");
    }
  } catch (e) {
    throw e;
  }
};

module.exports = {
  updateWeekly,
};
