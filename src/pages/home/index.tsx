import React, { useState, useEffect, useRef } from "react";

interface User {
  name: string;
  email: string;
}

// props
interface UserDataProps {
  userId: string;
}

const TsFunction: React.FC<UserDataProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [seconds, setSeconds] = useState<number>(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const fetchUserData = () => {
    fetch(`https://secret.url/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user data:", error));
  };

  // 组件挂载和 userId 变化
  useEffect(() => {
    fetchUserData();
    intervalIdRef.current = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [userId]);

  //  userId 变化时
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <div>
      <h1>User Data Component</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <p>Timer: {seconds} seconds</p>
    </div>
  );
};

export default TsFunction;
