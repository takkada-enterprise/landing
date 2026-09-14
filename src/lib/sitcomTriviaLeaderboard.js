// Leaderboard storage client for 60-Second Sitcom Trivia
// Connects to Supabase REST API when available, otherwise falls back to localStorage.

const LOCAL_STORAGE_KEY = 'takkada_sitcom_trivia_leaderboard_top3';

// Initial high scores set to 0
const INITIAL_LEADERBOARD = [
  { id: '1', name: '-', score: 0 },
  { id: '2', name: '-', score: 0 },
  { id: '3', name: '-', score: 0 },
];

function getSupabaseConfig() {
  const url = import.meta.env?.VITE_SUPABASE_URL || '';
  const key = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';
  return { url: url.trim(), key: key.trim() };
}

function getLocalLeaderboard() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return INITIAL_LEADERBOARD;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.slice(0, 3);
    }
  } catch (e) {
    console.warn('Failed to parse local leaderboard storage:', e);
  }
  return INITIAL_LEADERBOARD;
}

function saveLocalLeaderboard(scores) {
  try {
    const sorted = [...scores].sort((a, b) => b.score - a.score).slice(0, 3);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sorted));
    return sorted;
  } catch (e) {
    console.warn('Failed to save local leaderboard storage:', e);
    return scores.slice(0, 3);
  }
}

export async function fetchTop3Leaderboard() {
  const { url, key } = getSupabaseConfig();
  if (url && key) {
    try {
      const endpoint = `${url.replace(/\/$/, '')}/rest/v1/sitcom_trivia_leaderboard?select=id,name,score,created_at&order=score.desc,created_at.asc&limit=3`;
      const res = await fetch(endpoint, {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map((item) => ({
            id: String(item.id),
            name: String(item.name || 'Anonymous'),
            score: Number(item.score || 0),
            date: item.created_at ? item.created_at.split('T')[0] : '',
          }));
        }
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local storage:', err);
    }
  }

  return getLocalLeaderboard();
}

export async function submitLeaderboardScore({ name, score }) {
  const cleanName = (name || 'Anonymous').trim().slice(0, 25);
  const numericScore = Number(score) || 0;

  const { url, key } = getSupabaseConfig();
  if (url && key) {
    try {
      const endpoint = `${url.replace(/\/$/, '')}/rest/v1/sitcom_trivia_leaderboard`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          name: cleanName,
          score: numericScore,
        }),
      });
      if (res.ok) {
        return await fetchTop3Leaderboard();
      }
    } catch (err) {
      console.warn('Supabase score submit failed, saving to local fallback:', err);
    }
  }

  // Fallback local save
  const current = getLocalLeaderboard();
  const updated = [...current, { id: String(Date.now()), name: cleanName, score: numericScore, date: new Date().toISOString().split('T')[0] }];
  return saveLocalLeaderboard(updated);
}

export function isEligibleForTop3(score, currentLeaderboard) {
  if (!currentLeaderboard || currentLeaderboard.length < 3) return true;
  const thirdScore = currentLeaderboard[currentLeaderboard.length - 1]?.score ?? 0;
  return score > thirdScore;
}
