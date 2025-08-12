import { DestinationPlan } from "@/types/planTypes";

export const mockPlans: DestinationPlan[] = [
  {
    "destination": "Paris",
    "days": [
      {
        "date": "2025-08-25",
        "schedule": [
          {
            "time": "9:00AM - 10:30AM",
            "location": "Hotel",
            "action": "Check-in and settle into your accommodation",
            "image": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Hilton_Paris_Opera_2007.jpg"
          },
          {
            "time": "11:00AM - 1:00PM",
            "location": "Louvre Museum",
            "action": "Visit the Louvre to see world-famous art collections",
            "image": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Louvre_Museum_Wikimedia_Commons.jpg"
          },
          {
            "time": "1:30PM - 2:30PM",
            "location": "Café Marly",
            "action": "Enjoy lunch with a view of the Louvre courtyard",
            "image": "https://upload.wikimedia.org/wikipedia/commons/3/39/Cafe_Marly_Paris.jpg"
          },
          {
            "time": "3:00PM - 4:30PM",
            "location": "Seine River Seine Cruise",
            "action": "Relaxing cruise along the Seine to see famous landmarks",
            "image": "https://upload.wikimedia.org/wikipedia/commons/0/08/SeineRiverCruiseParis.jpg"
          }
        ]
      },
      {
        "date": "2025-08-26",
        "schedule": [
          {
            "time": "9:00AM - 10:00AM",
            "location": "Sacré-Cœur Basilica",
            "action": "Visit the beautiful basilica and enjoy panoramic views of Paris",
            "image": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Sacre_Coeur_Paris.jpg"
          },
          {
            "time": "10:30AM - 12:00PM",
            "location": "Montmartre neighborhood",
            "action": "Stroll around the artistic district, explore shops and cafes",
            "image": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Paris_Montmartre.jpg"
          },
          {
            "time": "12:30PM - 2:00PM",
            "location": "Le Consulat Café",
            "action": "Enjoy a leisurely lunch in Montmartre",
            "image": "https://upload.wikimedia.org/wikipedia/commons/e/e4/Le_Consulat_Montmartre.jpg"
          },
          {
            "time": "3:00PM - 5:00PM",
            "location": "Musée d'Orsay",
            "action": "Visit the Impressionist art collection housed in a former train station",
            "image": "https://upload.wikimedia.org/wikipedia/commons/3/3d/Musee_dOrsay_Wikimedia_Commons.jpg"
          }
        ]
      },
      {
        "date": "2025-08-27",
        "schedule": [
          {
            "time": "9:00AM - 10:30AM",
            "location": "Eiffel Tower",
            "action": "Visit the iconic Eiffel Tower and enjoy the view from the top",
            "image": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg"
          },
          {
            "time": "11:00AM - 12:30PM",
            "location": "Champs-Élysées and Arc de Triomphe",
            "action": "Walk along the famous avenue and visit the Arc de Triomphe",
            "image": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Champs-Élysées_Wikimedia_Commons.jpg"
          }
        ]
      }
    ]
  }
];
