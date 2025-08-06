import { DestinationPlan } from "@/types/planTypes";

export const mockPlans: DestinationPlan[] = [
  {
    "destination": "Paris, France",
    "days": [
      {
        "date": "2025-08-21",
        "schedule": [
          {
            "time": "08:10AM - 09:30AM",
            "location": "Charles de Gaulle Airport",
            "action": "Arrive and transfer to hotel, settle in",
            "image": "https://images.unsplash.com/photo-1528106511364-1da17d8cc11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            "coordinates": {"N": "49.0097", "E": "2.5479"}
          },
          {
            "time": "11:00AM - 01:00PM",
            "location": "Hotel Check-in & Rest",
            "action": "Relax and recover from travel",
            "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            "coordinates": {"N": "48.8708", "E": "2.3292"}
          }
        ]
      },
      {
        "date": "2025-08-22",
        "schedule": [
          {
            "time": "09:00AM - 11:00AM",
            "location": "Eiffel Tower",
            "action": "Enjoy panoramic views of Paris",
            "image": "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            "coordinates": {"N": "48.8584", "E": "2.2945"}
          },
          {
            "time": "01:00PM - 02:30PM",
            "location": "Louvre Museum",
            "action": "Light visit to explore famous artworks",
            "image": "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            "coordinates": {"N": "48.8606", "E": "2.3376"}
          },
          {
            "time": "03:30PM - 05:00PM",
            "location": "Seine River Cruise",
            "action": "Relaxing boat tour of Paris landmarks",
            "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            "coordinates": {"N": "48.8606", "E": "2.3376"}
          }
        ]
      }
    ]
  },
  {
    "destination": "London, UK",
    "days": [
      {
        "date": "2025-08-24",
        "schedule": [
          {
            "time": "06:11AM - 09:00AM",
            "location": "London Heathrow Airport",
            "action": "Arrive and transfer to hotel",
            "image": "https://images.unsplash.com/photo-1528106511364-1da17d8cc11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            "coordinates": {"N": "51.4700", "E": "-0.4543"}
          },
          {
            "time": "10:00AM - 12:00PM",
            "location": "Hotel Check-in & Rest",
            "action": "Relax after travel",
            "image": "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            "coordinates": {"N": "51.5045", "E": "-0.1445"}
          }
        ]
      },
      {
        "date": "2025-08-25",
        "schedule": [
          {
            "time": "09:00AM - 11:00AM",
            "location": "Westminster Abbey",
            "action": "Visit historic church",
            "image": "https://images.unsplash.com/photo-1566197287720-3a3e0f890de9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            "coordinates": {"N": "51.4993", "E": "-0.1273"}
          },
          {
            "time": "01:00PM - 02:00PM",
            "location": "Big Ben & Houses of Parliament",
            "action": "Sightseeing and photos",
            "image": "https://images.unsplash.com/photo-1549931384-690020160f70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            "coordinates": {"N": "51.5007", "E": "-0.1246"}
          },
          {
            "time": "04:00PM - 05:30PM",
            "location": "Buckingham Palace",
            "action": "Watch the Changing of the Guard",
            "image": "https://images.unsplash.com/photo-1578221603840-40291ad14562?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            "coordinates": {"N": "51.5014", "E": "-0.1419"}
          }
        ]
      }
    ]
  }
];
