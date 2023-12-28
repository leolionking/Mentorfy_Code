import React, { useState } from 'react'
import UserCard from '../../components/UserCard';

export default function UserConnection() {
  const [connections, setConnections] = useState([]);

  return (
    <div>
    <h1 className="text-xl lg:text-2xl font-['ginto-bold']">
      My Connections
    </h1>
    <p className="text-sm">
      Temporary Text you have no these mentees suggestions
    </p>
    <div className="py-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {connections.map((res) => (
          <UserCard />
        ))}
      </div>
    </div>
  </div>
  )
}
