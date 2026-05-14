export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { url } = req.body;

    const response = await fetch(
      `https://tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`
    );

    const data = await response.json();

    res.status(200).json({
      hd: data.data.hdplay || data.data.play,
      normal: data.data.play,
      music: data.data.music
    });

  } catch (err) {
    res.status(500).json({ error: "Download failed" });
  }
}