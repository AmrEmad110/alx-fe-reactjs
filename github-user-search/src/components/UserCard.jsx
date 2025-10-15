import React from "react";

export default function UserCard({ user }) {
  if (!user) return null;

  return (
    <div className="border rounded p-4 flex gap-4 items-center bg-white">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-20 h-20 rounded-full object-cover"
      />
      <div>
        <h2 className="text-lg font-semibold">{user.name || user.login}</h2>
        {user.bio && <p className="text-sm text-gray-600">{user.bio}</p>}
        <div className="mt-2 text-sm text-gray-700">
          <a className="text-blue-600 hover:underline" href={user.html_url} target="_blank" rel="noreferrer">View GitHub profile</a>
          <span className="ml-3 text-gray-500">Repos: {user.public_repos ?? "—"}</span>
          {user.location && <span className="ml-3 text-gray-500">Location: {user.location}</span>}
        </div>
      </div>
    </div>
  );
}