import React, { useEffect, useState, useRef, ReactNode} from "react";

interface GalleryDivProps {
  children: ReactNode;
  direction?: string;
  galleryItemsAspectRatio: "video" | "portrait" | "auto" | "square";
}

export default function GalleryDiv({
  children,
  direction = "right",
  galleryItemsAspectRatio,
}: GalleryDivProps) {
  return (
    <div className="gallery" data-direction={direction} >

      <div className="floating_content" data-images={galleryItemsAspectRatio}>
        {children}
      </div>
    </div>
  );
}