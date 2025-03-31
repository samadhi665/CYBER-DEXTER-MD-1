import axios from 'axios';
import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';

const ytDownload = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['yt', 'youtube', 'song', 'ytdl'];

  if (validCommands.includes(cmd)) {
    if (!text) return m.reply('Please provide a YouTube URL or song name.');

    try {
      await m.React('🕘');

      let url;
      if (ytdl.validateURL(text)) {
        
        url = text;
      } else {
        
        const searchUrl = https://www.youtube.com/results?search_query=${encodeURIComponent(text)};
        const response = await axios.get(searchUrl);
        const videoId = response.data.match(/watch\?v=([a-zA-Z0-9_-]{11})/)[1];
        url = https://www.youtube.com/watch?v=${videoId};
      }

      const videoInfo = await ytdl.getInfo(url);
      const title = videoInfo.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '_');
      const filePath = path.join(__dirname, ${title}.mp3);

      ytdl(url, { filter: 'audioonly' })
        .pipe(fs.createWriteStream(filePath))
        .on('finish', async () => {
          const caption = 🎵 *${videoInfo.videoDetails.title}*\n© Powered By HANSAMAL-MD;

          
          await Matrix.sendMedia(m.from, filePath, 'audio', caption, m);
          await m.React('✅');

          fs.unlinkSync(filePath);
        });
    } catch (error) {
      console.error('Error downloading YouTube song:', error.message);
      m.reply('Error downloading YouTube song.');
      await m.React('❌');
    }
  }
};

export default ytDownload;
