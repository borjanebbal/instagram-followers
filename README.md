# Instagram Followers

A browser console script that fetches your Instagram followers and following lists, then computes who doesn't follow you back and vice versa.

> Based on [this Stack Overflow answer](https://stackoverflow.com/a/74133719).

## Requirements

- You must be **logged in to Instagram** in your browser before running the script.
- Works in Chrome, Firefox, Edge, or any browser with DevTools.

## Usage

1. Open [instagram.com](https://www.instagram.com) and log in to your account.
2. Open DevTools (`F12` or `Cmd+Option+I` on Mac).
3. Go to the **Console** tab.
4. Open `instagram-followers.js`, replace `ENTER_YOUR_USERNAME` at the top with your Instagram username, then copy the entire script.
5. Paste it into the console and press `Enter`.

The script will log progress as it runs. For large accounts it may take a minute or two — a 1-second delay between pages is intentional to avoid rate limiting.

## Output

When complete, four variables are available in the console:

| Variable | Contents |
|---|---|
| `followers` | Everyone who follows you |
| `followings` | Everyone you follow |
| `dontFollowMeBack` | People you follow who don't follow you back |
| `iDontFollowBack` | People who follow you that you don't follow back |

Each entry is an object with `username` and `full_name` fields.

## Exporting

Use the browser's built-in `copy()` helper to copy any list to your clipboard:

```js
copy(dontFollowMeBack)
```

Then paste into a text editor or spreadsheet.

## Notes

- This uses Instagram's internal API and is not officially supported. It may break if Instagram changes their API.
- Running this too frequently or on very large accounts may trigger a temporary rate limit.
- The script only works for **your own account** (accounts you have access to while logged in).
