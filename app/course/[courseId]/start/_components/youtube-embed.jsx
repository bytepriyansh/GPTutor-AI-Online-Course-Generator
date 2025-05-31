import React from 'react';

export const YoutubeEmbed = ({ videoId }) => (
    <div className="w-full max-w-3xl mx-auto aspect-video rounded-lg overflow-hidden shadow-md">
        <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube Video Player"
            frameBorder="0"
            allowFullScreen
            className="w-full h-64 md:h-80" 
        />
    </div>
);
