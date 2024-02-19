// pages/api/mock-data.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export type UserType = {
  id:number,
  name:string,
  email:string,
  description:string,
  phone:number,
  likes:number
}
export const mockUsers :UserType[] = [{ id: 1, name: 'John Doe', email: 'john.doe@example.com', description: 'Enjoys outdoor activities and coding.', phone: 1234567890,likes: 5 },
  { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', description: 'Passionate about technology and innovation.', phone: 2345678901,likes: 4 },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', description: 'Loves reading and spending time with family.', phone: 3456789012,likes: 6 },
  { id: 4, name: 'Michael Brown', email: 'michael.brown@example.com', description: 'Avid gamer and music enthusiast.', phone: 4567890123,likes: 21 },
  { id: 5, name: 'Linda Williams', email: 'linda.williams@example.com', description: 'Interested in astronomy and scientific research.', phone: 5678901234,likes: 70 },
  { id: 6, name: 'David Smith', email: 'david.smith@example.com', description: 'Enjoys hiking, photography, and cooking.', phone: 6789012345,likes: 7 },
  { id: 7, name: 'Sarah Miller', email: 'sarah.miller@example.com', description: 'Fan of classic literature and cinema.', phone: 7890123456,likes: 13 },
  { id: 8, name: 'Brian Davis', email: 'brian.davis@example.com', description: 'Dedicated volunteer and community organizer.', phone: 8901234567,likes: 10 }
]
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    users: mockUsers,
  });
}
