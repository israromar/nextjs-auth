const UserProfile = ({ params }: any) => {
  // Example user data (replace with actual user data)
  const user = {
    username: "john_doe",
    fullName: "John Doe",
    email: "john@example.com",
    avatarUrl: "https://via.placeholder.com/150",
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center">
          <img
            src={user.avatarUrl}
            alt={`${user.username} avatar`}
            className="h-20 w-20 rounded-full"
          />
        </div>
        <h2 className="mt-4 text-center text-xl font-semibold text-gray-800">
          {user.fullName} | {params.id}
        </h2>
        <p className="mt-2 text-center text-gray-500">{user.email}</p>
        <div className="mt-6">
          <button className="w-full bg-indigo-600 text-white font-semibold rounded-md py-2 px-4 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
