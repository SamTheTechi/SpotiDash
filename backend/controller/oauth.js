const axios = require(`axios`);
const querystring = require("querystring");

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const login = async (req, res) => {
  const state = req.query.state;
  const scope =
    "user-read-private user-library-read playlist-read-private playlist-modify-private playlist-modify-public user-top-read";

  res.redirect(
    `https://accounts.spotify.com/authorize?` +
      querystring.stringify({
        response_type: "code",
        client_id: SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: `${req.protocol}://${req.get("host")}/callback`,
        state: state,
      }),
  );
};

const callback = async (req, res) => {
  let code = req.query.code || null;
  let state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        }),
    );
  } else {
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: `${req.protocol}://${req.get("host")}/callback`,
        grant_type: "authorization_code",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            encodeURIComponent(SPOTIFY_CLIENT_ID) +
              ":" +
              encodeURIComponent(SPOTIFY_CLIENT_SECRET),
          ).toString("base64"),
      },
    };
    try {
      const response = await axios.post(
        authOptions.url,
        querystring.stringify(authOptions.form),
        {
          headers: authOptions.headers,
        },
      );
      let access_token = response.data.access_token;

      res.cookie(`access_token`, access_token, { maxAge: 360000 });

      res.status(200).redirect(`${state}`);
    } catch (e) {
      console.error(e);
      res.status(500).redirect(`${req.protocol}://${req.get("host")}/login`);
    }
  }
};

module.exports = {
  login,
  callback,
};
