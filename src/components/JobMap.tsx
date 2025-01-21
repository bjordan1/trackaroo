import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { JobApplication } from '@/pages/Index';

interface JobMapProps {
  jobs: JobApplication[];
}

const JobMap = ({ jobs }: JobMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // Replace with your Mapbox token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-98.5795, 39.8283], // Center of USA
      zoom: 3
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add markers for each job
    jobs.forEach(job => {
      if (job.location?.coordinates) {
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(
            `<div class="p-2">
              <h3 class="font-bold">${job.company}</h3>
              <p class="text-sm">${job.position}</p>
              <p class="text-xs text-gray-500">${job.location.address}</p>
              <span class="inline-block px-2 py-1 mt-1 text-xs rounded-full bg-blue-100 text-blue-800">
                ${job.status}
              </span>
            </div>`
          );

        new mapboxgl.Marker()
          .setLngLat(job.location.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [jobs]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-gray-200">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default JobMap;