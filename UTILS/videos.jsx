import React from 'react';
const videos = [
    {
      id: 1,
      url: "https://embed.elai.io/64593d34a0d8bb78ba4aafd7", // Replace with your actual YouTube video ID
      title: "Healthcare management",
      description: "At Medical Billing MB, our certified coders are dedicated to providing the best coding services and meeting all industry standards."
    },
    {
      id: 2,
      url: "https://embed.elai.io/64c571d528028870939e3530", // Replace with your actual YouTube video ID
      title: "💰⏰ Get a Free Medical Billing Audit",
      description: "Start Collecting More from Insurance (Limited Time Only!). includes: - 👥 Analysis of billing workflows,🚫 Evaluation of denial management, and 📄 Sample coding review"
    },
    {
      id: 3,
      url: "https://embed.elai.io/64454c1625d4d06d40ff1d79", // Replace with your actual YouTube video ID
      title: "Are you tired of spending countless hours on medical billing for your practice?",
      description: "et us help! Our team of experts can handle all of your medical billing needs, from benefit and eligibility verification to claims submission and payment posting."
    }
  ];
const VideoShowcase = () => {
  return (
    <div className=" w-11/12 xl:max-w-7xl grid grid-cols-1 sm:grid-cols-2 grid-rows-2 sm:grid-rows-3 lg:grid-rows-2 gap-4 max-w-7xl mx-auto " >
      {videos.map((video, index) => (
        <div
          key={video.id}
          className={`h-full flex flex-col justify-center my-6 ${
            index === 0 ? 'row-span-1 sm:row-span-2 md:row-span-2 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' : 'row-span-1'
          }`}
        >
          <iframe
            width="100%"
            height={'100%'}
            className={` rounded-lg mb-1  shadow-gray-500 ${index===0?"shadow-lg h-full":'shadow-sm md:h-5/6'}`}
            src={video.url}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="video-info">
            <h3 className='text-lg text-gray-900 font-semibold'>{video.title}</h3>
            <p className='text-gray-600 font-sans' >{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoShowcase;
