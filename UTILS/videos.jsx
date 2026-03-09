import React from 'react';
import Image from "next/image";

const videos = [
    {
      id: 1,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder - update with actual medical billing video
      title: "How Medical Billing Services Transform Your Practice",
      description: "Discover how professional medical billing can streamline your revenue cycle, reduce denials, and maximize reimbursements for your practice."
    },
    {
      id: 2,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder - update with actual medical billing video
      title: "💰⏰ Get a Free Medical Billing Audit",
      description: "Start Collecting More from Insurance (Limited Time Only!). Includes: Analysis of billing workflows, Evaluation of denial management, and Sample coding review"
    },
    {
      id: 3,
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder - update with actual medical billing video
      title: "Why Outsource Medical Billing for Your Practice?",
      description: "Let us help! Our team of experts can handle all of your medical billing needs, from benefit and eligibility verification to claims submission and payment posting."
    }
  ];

const VideoShowcase = () => {
  return (
    <div className="w-11/12 xl:max-w-7xl grid grid-cols-1 sm:grid-cols-2 grid-rows-2 sm:grid-rows-3 lg:grid-rows-2 gap-4 max-w-7xl mx-auto">
      {videos.map((video, index) => (
        <div
          key={video.id}
          className={`h-full flex flex-col justify-center my-6 ${
            index === 0 ? 'row-span-1 sm:row-span-2 md:row-span-2 sm:col-span-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' : 'row-span-1'
          }`}
        >
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-900">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video-info mt-3 px-2">
            <h3 className='text-lg text-gray-900 font-semibold'>{video.title}</h3>
            <p className='text-gray-600 font-sans text-sm'>{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoShowcase;
