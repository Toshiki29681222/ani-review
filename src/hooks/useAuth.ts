import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth(requireAuth: boolean = true) {
  const router = useRouter();
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("authToken");
        const user = localStorage.getItem("user");

        if (!token || !user) {
          if (requireAuth) {
            router.push("/auth/signin");
            return;
          }
        } else {
          const parsedUser = JSON.parse(user);
        }
      } catch (error) {}
    };
    checkAuth();
  }, []);
}
