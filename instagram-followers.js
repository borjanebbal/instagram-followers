const username = "ENTER_YOUR_USERNAME";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchList(userId, type) {
  const results = [];
  let cursor = "";
  let hasNext = true;

  while (hasNext) {
    const url =
      `https://www.instagram.com/api/v1/friendships/${userId}/${type}/?count=50` +
      (cursor ? `&max_id=${cursor}` : "");

    const res = await fetch(url, {
      headers: { "x-ig-app-id": "936619743392459" },
    });

    if (!res.ok) throw new Error(`Failed to fetch ${type}: HTTP ${res.status}`);

    const data = await res.json();
    hasNext = data.next_max_id != null;
    cursor = data.next_max_id ?? "";

    results.push(
      ...data.users.map(({ username, full_name }) => ({ username, full_name }))
    );

    if (hasNext) await delay(1000);
  }

  return results;
}

(async () => {
  try {
    console.log("Fetching user info...");

    const profileRes = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
      { headers: { "x-ig-app-id": "936619743392459" } }
    );

    if (!profileRes.ok)
      throw new Error(`Failed to fetch profile: HTTP ${profileRes.status}`);

    const profileData = await profileRes.json();
    const userId = profileData.data.user.id;

    console.log(`User ID: ${userId}. Fetching followers...`);
    const followers = await fetchList(userId, "followers");
    console.log(`Fetched ${followers.length} followers.`);

    console.log("Fetching following...");
    const followings = await fetchList(userId, "following");
    console.log(`Fetched ${followings.length} following.`);

    const dontFollowMeBack = followings.filter(
      (following) => !followers.find((f) => f.username === following.username)
    );

    const iDontFollowBack = followers.filter(
      (follower) => !followings.find((f) => f.username === follower.username)
    );

    Object.assign(window, { followers, followings, dontFollowMeBack, iDontFollowBack });

    console.log({ followers, followings, dontFollowMeBack, iDontFollowBack });
    console.log(
      `Summary: ${followers.length} followers | ${followings.length} following | ` +
        `${dontFollowMeBack.length} don't follow you back | ` +
        `${iDontFollowBack.length} you don't follow back`
    );
    console.log(
      "Done! Use copy(followers), copy(followings), copy(dontFollowMeBack), or copy(iDontFollowBack) to export."
    );
  } catch (err) {
    console.error("Error:", err.message ?? err);
  }
})();
